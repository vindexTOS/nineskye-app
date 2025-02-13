import { useMutation, useQuery } from '@tanstack/react-query';
import { GetUserInfo } from '../../../API/User/GetRequests';
import ParcelsTable from '../../../components/parcels/ParcelsTable';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';
import { Button, message, Modal, Table } from 'antd';
import { PayForParcel } from '../../../API/Deposite/Deposite';

export default function Arrived() {
  const [userInfo, setUserInfo] = useState<any>();
  const [StorageData, setStorageData] = useState<any[]>([]);
  const [payAmount, setPayAmount] = useState<string>("0");
  const [openModal, setOpenModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [selectedRowPrice, setSelectedRowPrice] = useState<number>(0);

  const cookies = new Cookies();

  // Decode user token on mount
  useEffect(() => {
    const decode = async () => {
      let token = cookies.get("token");
      let decodedUser = await jwt_decode(token);
      setUserInfo(decodedUser);
    };
    decode();
  }, []);

  // Fetch user info
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => userInfo ? GetUserInfo() : Promise.resolve(),
    enabled: !!userInfo,
  });

  // Filter flights to only those with shipping_status "Arrived"
  useEffect(() => {
    if (data?.data?.flights) {
      let extractedFlights = data.data.flights.filter((val: any) => val.shipping_status === 'Arrived');
      setStorageData(extractedFlights);
    }
  }, [data]);

  // Mutation for paying for parcels
  const mutation = useMutation({
    mutationFn: (body: any) => PayForParcel(body),
    onSuccess() {
      window.location.reload();
    },
    onError(){
       message.error("არა საკამრისი თანხა")
    }
  });

  const payMoney = async () => {
    await mutation.mutateAsync(selectedRows);
    setOpenModal(false);
  };

  // Calculate the total payable amount for all unpaid parcels across flights
  const calclatePayAmount = () => {
    const unpaidItems = StorageData.flatMap((flight: any) =>
      flight.parcels.filter((item: any) => item.payment_status === 'Unpaid')
    );
    if (unpaidItems.length > 0) {
      const amountPay: number = unpaidItems
        .map((item: any) => Number(item.price))
        .reduce((a: number, b: number) => a + b, 0);
      setPayAmount(amountPay.toFixed(2));
    } else {
      setPayAmount("0");
    }
  };

  useEffect(() => {
    if (StorageData.length > 0) {
      calclatePayAmount();
    }
  }, [StorageData]);

  // Define table columns for the payment modal (for unpaid parcels)
  const columns = [
    { title: 'Tracking ID', dataIndex: 'id', key: 'id' },
    { title: 'ფასი', dataIndex: 'price', key: 'price' },
    { title: 'წონა', dataIndex: 'weight', key: 'weight' },
    { title: 'გადახდის სტატუსი', dataIndex: 'payment_status', key: 'payment_status' },
    // { title: 'გადაზიდვის სტატუსი', dataIndex: 'shipping_status', key: 'shipping_status' },
  ];

  // For the modal, combine all unpaid parcels from all flights into one array.
  const unpaidParcels = StorageData.flatMap((flight: any) =>
    flight.parcels.filter((item: any) => item.payment_status === 'Unpaid')
  );

  // Row selection for the modal table
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      // Create an array of objects with tracking_id for API call.
      const newArr = selectedRowKeys.map((val: any) => ({ tracking_id: val }));
      setSelectedRows(newArr);
      // Calculate total price of selected rows
      let totalPrice = selectedRows.map((val: any) => Number(val.price)).reduce((a: number, b: number) => a + b, 0);
      setSelectedRowPrice(totalPrice);
    },
  };

  return (
    <div>
      <div className="flex items-center flex-row gap-5">
        <h1>
          გადასახდელი თანხა ჯამური <span className="text-green-500">₾{payAmount}</span>
        </h1>
        <Button onClick={() => setOpenModal(true)}>გადახდა</Button>

        {/* Payment Modal */}
        <Modal
          open={openModal}
          onCancel={() => setOpenModal(false)}
          title="გადახდა"
          footer={null}
        >
          <div className="mb-4">
            <p>
              გადასახდელი ჯამი: <span className="font-bold">{selectedRowPrice.toFixed(2)}</span>
            </p>
          </div>
          <Table
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
            columns={columns}
            dataSource={unpaidParcels.map((item: any) => ({ ...item, key: item.id }))}
            pagination={false}
          />
          <div className="mt-4 flex justify-end">
            <Button type="primary" onClick={payMoney}>
              გადახდა
            </Button>
          </div>
        </Modal>
      </div>

      {/* Render main Parcels Table for Arrived flights */}
      <ParcelsTable refetch={refetch} data={StorageData} color={'#ffb71c'} title={'ჩამოსული'} />
    </div>
  );
}
