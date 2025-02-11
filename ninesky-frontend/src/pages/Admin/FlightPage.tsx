import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Table, Select, DatePicker, message, Pagination ,Typography} from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CreateFlightType } from '../../types/flight.type';
import { CreateFlight, GetFlights } from '../../API/Admin/ParcelAndFlights';
import { shippingStatusTranslation } from '../../types/shipping_status';
import FlightDetailsModal from '../../components/modals/FlightDetailsModal';
const { Text } = Typography;
export default function SimpleParcelPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10
  })
  const [searchById, setSearchById] = useState("")

 
  const openModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };






  const onFinish = async (values: any) => {
    const body: CreateFlightType = {
      flight_id: values.flight_id,
      flight_from: values.flight_from,
      arrived_at: values.arrived_at,

    };

    setIsModalOpen(false);
    await createFlightMutation.mutateAsync(body)
  };

  const createFlightMutation = useMutation({
    mutationFn: (body: CreateFlightType) => CreateFlight(body),
    onSuccess: () => {
      closeModal()
      message.success("ფრენა წარმატებით შეიქმნა")
    },
    onError: (err) => {
      closeModal()
      message.error(err.message + " ფრენა ვერ შეიქმნა")
    }
  })




  const flightData = useQuery({
    queryKey: ["get-flights", { page: pagination.page, limit: pagination.limit }], queryFn: () => GetFlights(
      pagination.page, pagination.limit, searchById
    )
  })
 

  const getSingleFlightMutation = useMutation({
     mutationFn:(id:string )=>GetFlights(
      pagination.page, pagination.limit,id
    ),
  })
  const openSingleFlight = async (id:string ) =>{
 
     await getSingleFlightMutation.mutateAsync(id)
  }

  useEffect(()=>{console.log(getSingleFlightMutation.data)},[getSingleFlightMutation])
  const columns = [
    { title: 'ფრენის ID', dataIndex: 'flight_id', key: 'flight_id' },
    { title: 'ქვეყანა', dataIndex: 'flight_from', key: 'flight_from' },
    { title: 'სტატუსი', dataIndex: 'shipping_status', key: 'shipping_status',  render: (text:string) => shippingStatusTranslation[text] || text,   },
    { title: 'ჩამოსვლის თარიღი', dataIndex: 'arrived_at', key: 'arrived_at' ,  render: (text:any) => new Date(text).toISOString().split('T')[0],  },
    
        {
          title: 'ამანათები',
          key: 'action',
          render: (_: any, flightObj: CreateFlightType) => (
            <Button type="primary"  onClick={() => openSingleFlight(flightObj.flight_id)}>
               ვრცლად
             </Button>
          ),
        },
  ];

  return (
    <div className="p-10  ">
      <div className="mx-auto bg-white rounded-lg p-8">
        {/* Create Button */}
        <Button type="primary" onClick={openModal}>
          + შექმენი რეისი
        </Button>

        {/* Create Parcel Modal */}
        <Modal
          title="შექმენით ახალი ფრენა"
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="ფრენის იდენტიფიკატორი"
              name="flight_id"
              rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ ფრენის ID' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="ქვეყანა"
              name="flight_from"
              rules={[{ required: true, message: 'გთხოვთ აირჩიოთ ქვეყანა' }]}
            >
              <Select placeholder="Select country">
                <Select.Option value="China">ჩინეთი</Select.Option>
                <Select.Option value="Turkey">თურქეთი</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="ჩამოსვლის დრო"
              name="arrived_at"
              rules={[{ required: true, message: 'მონიშნეთ ჩამოსვლის დრო' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                შენახვა
              </Button>
            </Form.Item>
          </Form>
        </Modal>

   
        <Table
          columns={columns}
          dataSource={flightData.data?.flights || []}
          pagination={false}
          className="mt-6"
          rowKey="id"
        />
            <Pagination
          current={Number(flightData.data?.page) || pagination.page}
          total={Number(flightData.data?.total) || 0}
          pageSize={pagination.limit}
          onChange={(page) =>
            setPagination((prev) => ({ ...prev, page }))
          }
          style={{ marginTop: '16px', textAlign: 'center' }}
        />

 <FlightDetailsModal getSingleFlightMutation={getSingleFlightMutation} /> 
      </div>
    </div>
  );
}
