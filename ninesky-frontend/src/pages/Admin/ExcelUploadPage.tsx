 import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as XLSX from 'xlsx';
import { CreateParcles, GetParcels, UpdateParcels } from '../../API/Admin/CreateParcels';
import Loading from '../../components/status/Loading';
import { Button, Modal, Form, Input,Typography, message, Table, Pagination, Upload, Select, DatePicker } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { DeleteParcel } from '../../API/Admin/DeleteRequests';

export default function ExcelUploadPage() {
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelecrationModalOpen,setIsDeclerationModalOpen] = useState(false)
  const [isSingleParcelModalOpen, setIsSingleParcelModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<any>(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false)

  const [singleParcelForm] = Form.useForm();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [ selectedParcelId,setSelectedParcelId] = useState("")


const {Text} = Typography

  const handleManualOpen = () => {
    form.resetFields();
    setIsModalOpen(true);
    setSelectedParcel(null);
  };

  const handleDelete = async (id: string ) => {
    setSelectedParcelId(id)
    setIsDeleteModalOpen(true)
  };

 const handleDeleteMutation = async (id:string)=>{
  await deleteMutation.mutateAsync(id)
}
  const handleFileUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const binaryStr = event?.target?.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);
      const updatedData = jsonData.map((item: any) => ({
        
        tracking_id:String(Object.values(item)[0]),
        ownerId: Object.values(item)[1],
        weight: Object.values(item)[2]
      }));
      setData(updatedData);
    };
    reader.readAsBinaryString(file);
  };

  const handleUploadFinish = () => {
    if (data.length > 0) {
      const uploadData = {
        flight_info: {
          flight_id: form.getFieldValue('flight_id'),
          flight_from: form.getFieldValue('flight_from'),
          arrived_at: form.getFieldValue('arrived_at'),
        },
        parcels: data,
      };
      console.log(uploadData)
      createMutation.mutate(uploadData);
      handleCancel();
    } else {
      message.error('Please upload a valid Excel file with parcel data.');
    }
  };

  const deleteMutation = useMutation({
    mutationFn:(id:string)=>{
     return DeleteParcel(id )
    },
    onSuccess(){
     message.success('ამანათი წაიშალა');
     refetch()

    },
    onError(){
     message.error('შეცდომა ამანათის წაშლა ვერ მოხერხდა!');

    }
 })
  const createMutation = useMutation({
    mutationFn: (body: any) => {
      return CreateParcles(body);
    },
    onError(err) {
      console.log(err.message);
      message.error(err.message)
    },
    onSuccess() {
      message.success('Parcels created successfully');
      refetch();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: any) => {
      return UpdateParcels(body);
    },
    onError(err) {
      console.log(err);
    },
    onSuccess() {
      message.success('Parcel updated successfully');
      refetch();
      handleCancel();
    },
  });

  const { data: parcelsData, isLoading: isLoadingParcels, isError, error, refetch } = useQuery({
    queryKey: ['parcels-info', searchTerm, currentPage],
    queryFn: () => GetParcels(searchTerm, '',currentPage, 10),
  });

  useEffect(() => {
    // console.log(parcelsData);
  }, [parcelsData]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedParcel(null);
  };

  const handleSingleParcelCancel = () => {
    setIsSingleParcelModalOpen(false);
  };

  const handleSingleParcelOpen = () => {
    singleParcelForm.resetFields();
    setIsSingleParcelModalOpen(true);
  };

  const handleSingleParcelFinish = (values: any) => { 
  console.log(values)
    // Transform values into CreateParcelDto format
    const newParcel    = {
      tracking_id: values.tracking_id,
      weight: values.weight ? Number(values.weight) : undefined,
      ownerId: values.ownerId,
    };

    // Create the flight information for a single parcel
    const flightInfo = {
      flight_id: values.flight_id,
      flight_from: values.flight_from,
      arrived_at: values.arrived_at,
    };
console.log(flightInfo)
    const uploadData = {
      flight_info: flightInfo,
      parcels: [newParcel],
    };

    createMutation.mutate(uploadData);
    handleSingleParcelCancel();
  };

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenDeclaration = (parcel: any) => {
    setSelectedParcel(parcel);
    setIsDeclerationModalOpen(true);
  };
  const handleUpdate = (values: any) => {
    const convertedValues = {
      tracking_id: selectedParcel.id, // Keeping the original parcel ID
      ownerId: selectedParcel.owner?.id, // Keeping the original owner ID
      payment_status: values.payment_status,
      price: values.price ? Number(values.price) : undefined,
      shipping_status: values.shipping_status,
      weight: values.weight ? Number(values.weight) : undefined,
    };
  
    updateMutation.mutate(convertedValues);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setSelectedParcel(null);
  };
 useEffect(()=>{
//  console.log(parcelsData?.parcels)
 },[parcelsData?.parcels])
  const columns = [
    { title: 'id', dataIndex: 'id', key: 'id' },
    // { title: 'Tracking ID', dataIndex: 'tracking_id', key: 'id' },
    { title: 'გადაზიდვის სტატუსი', dataIndex: 'shipping_status', key: 'shipping_status' },
    { title: 'გადახდის სტატუსი', dataIndex: 'payment_status', key: 'payment_status' },
    { title: 'წონა', dataIndex: 'weight', key: 'weight' },
    { title: 'ფასი', dataIndex: 'price', key: 'price' },
    // { title: 'თარიღი', dataIndex: 'arrived_at', key: 'arrived_at' },
    {
      title: 'დეკლერაცია',
      key: 'declaration',
      render: (_: any, parcel: any) =>
        parcel.declaration ? (
          <Button type="link" onClick={() => handleOpenDeclaration(parcel)}>
            დეკლარაცის ნახვა
          </Button>
        ) : (
          <span>დეკლარაცის გარეშე</span>
        ),
    },
   
    {
      title: 'რედაქტირება',
      key: 'action',
      render: (_: any, parcel: any) => (
        <Button type="primary"  onClick={() => handleEdit(parcel)}>
  რედაქტ
         </Button>
      ),
    },
    {
      title: 'წაშლა',
      key: 'delete',
      render: (_: any, parcel: any) => (
        <Button
          type="primary"
          style={{ backgroundColor: 'red', borderColor: 'red', color: 'white' }}
          onClick={() => handleDelete(parcel.id)}
        >
          წაშლა
        </Button>
      ),
    },
  ];

  const handleEdit = (parcel: any) => {
    // console.log(parcel);
    setSelectedParcel(parcel);
    setIsEditModalOpen(true);
  
    // Set only the necessary fields from the received parcel data
    editForm.setFieldsValue({
      id: parcel.id,
      ownerId: parcel.owner?.id || '',
      payment_status: parcel.payment_status || 'Unpaid',
      price: parcel.price || '',
      shipping_status: parcel.shipping_status || '',
      weight: parcel.weight || '',
    });
  };
  return (
    <div className="p-10 min-h-screen">
      <div className="mx-auto bg-white rounded-lg p-8">
        <div className="flex justify-between mb-6 flex-col">
          <Button type="primary" onClick={handleManualOpen}>
            +  ექსელით შექმნა   +
          </Button>
          <Button type="primary" onClick={handleSingleParcelOpen} className="mt-4">
            + ერთის შექმნა +
          </Button>
        </div>
        <Input.Search
          placeholder="მოძებნა თრექინგ Id-ით"
          onSearch={(value) => setSearchTerm(value)}
          enterButton
          className="mb-6"
          size="large"
        />
        <Loading loading={createMutation.isPending || isLoadingParcels} />

        <Table
          columns={columns}
          dataSource={parcelsData?.parcels || []}
          loading={isLoadingParcels}
          pagination={false}
          rowKey="id"
          className="mb-6"
        />
        <Pagination
          current={currentPage}
          total={parcelsData?.totalCount || 0}
          pageSize={10}
          onChange={handlePaginationChange}
          showSizeChanger={false}
          showQuickJumper
          simple
          className="text-center"
        />

 

 
         <Modal
          title={selectedParcel ? 'ამანათის რედაქტირება' : 'ამანათის ატვირთვა'}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleUploadFinish}>
            <Form.Item label="ფრენის ID" name="flight_id">
              <Input />
            </Form.Item>
            <Form.Item label="ქვეყანა" name="flight_from">
              <Select>
                <Select.Option value="China">შინეთი</Select.Option>
                <Select.Option value="Turkey">თურქეთი</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
  label="თარიღი"
  name="arrived_at"
  rules={[{ required: true, message: 'შეიყვანეთ ჩამოსვლა' }]}
>
  <DatePicker style={{ width: '100%' }} />
</Form.Item>
            <Upload.Dragger
              name="file"
              multiple={false}
              accept=".xlsx, .xls"
              beforeUpload={(file) => {
                handleFileUpload(file);
                return false;
              }}
              className="mb-4"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">დააკლიკეთ ან ჩააგდეთ excel ფაილი აქ</p>
              <p className="ant-upload-hint"> მხოლოდ .xlsx  ან .xls ფორმატები.</p>
            </Upload.Dragger>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={createMutation.isPending} className="w-full">
               შენახვა
              </Button>
            </Form.Item>
          </Form>
        </Modal>
{/*  */}
<Modal
          title="ამანათის რედაქტირება"
          open={isEditModalOpen}
          onCancel={handleEditCancel}
          footer={null}
        >
          <Form form={editForm} layout="vertical" onFinish={handleUpdate}>
            
            <Form.Item label="Weight" name="weight">
              <Input type="number" />
            </Form.Item>
   
            <Form.Item label="Price" name="price">
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Shipping Status"
              name="shipping_status"
              rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ გადაზიდვის სტატუსი' }]}
            >
                 <Select>
                <Select.Option value="Brought">საწყობში</Select.Option>
                <Select.Option value="Shipped">გამოგზავნილი</Select.Option>
                <Select.Option value="Arrived">ჩამოსული</Select.Option>
                <Select.Option value="Taken">გატანილი</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Payment Status"
              name="payment_status"
              rules={[{ required: true, message: 'გთხოვთ შეიყვანეთ გადახდის სტატუსი' }]}
            >
              <Select>
                <Select.Option value="Paid">გადახდილი</Select.Option>
                <Select.Option value="Unpaid">გადაუხდელი</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={updateMutation.isPending} className="w-full">
              ამანათის განახლება
                         </Button>
            </Form.Item>
          </Form>
        </Modal>
      {/*  */}
        <Modal
          title="დაამატე თითო ამანათი"
          open={isSingleParcelModalOpen}
          onCancel={handleSingleParcelCancel}
          footer={null}
        >
          <Form form={singleParcelForm} layout="vertical" onFinish={handleSingleParcelFinish}>
            <Form.Item
              label="რეისის ID"
              name="flight_id"
              rules={[{ required: true, message: 'შეიყვანეთ რეისის იდენტიფიკატორი' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="ქვეყანა"
              name="flight_from"
              rules={[{ required: true, message: 'შეიყვანეთ ტრანსპორტის ქვეყანა' }]}
            >
              <Select>
                <Select.Option value="China">ჩინეთი</Select.Option>
                <Select.Option value="Turkey">თურქეთი</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
  label="თარიღი"
  name="arrived_at"
  rules={[{ required: true, message: 'შეიყვანეთ ჩამოსვლა' }]}
>
  <DatePicker style={{ width: '100%' }} />
</Form.Item>
            <Form.Item
              label="თრექინგის ID"
              name="tracking_id"
              rules={[{ required: true, message: 'გთხოვთ შეიყვანეთ თრექინგ იდენტიფიკატორი' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="წონა" name="weight">
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="მომხმარებლის ID"
              name="ownerId"
              rules={[{ required: true, message: 'შეიყვანეთ მომხმარებლის იდენტიფიკატორი' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={createMutation.isPending} className="w-full">
              შენახვა
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        {/*  */}
        <Modal
      title="Delete Declaration"
      open={isDeleteModalOpen}
      onCancel={() => setIsDeleteModalOpen(false)}
      footer={null} // Custom footer instead of default buttons
    >
      <div style={{ textAlign: "center" }}>
        {/* Styled Question */}
        <Text strong style={{ fontSize: "16px" }}>
         დარწმუნებული ხართ რომ გსურთ ამ  ამანათის წაშლა ?
        </Text>
        
        {/* Action Buttons */}
        <div style={{ marginTop: "20px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              handleDeleteMutation(selectedParcelId);
              setIsDeleteModalOpen(false);
            }}
            style={{ marginRight: "10px" }}
          >
            კი,წაშალე
          </Button>
          <Button onClick={() => setIsDeleteModalOpen(false)}>გაუქმება</Button>
        </div>
      </div>
    </Modal>
{/*  */}
        {/* delecration modal */}
        <Modal
          title="Declaration Details"
          open={isDelecrationModalOpen}
          onCancel={() => setIsDeclerationModalOpen(false)}
          footer={null}
        >
          {selectedParcel?.declaration ? (
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="font-semibold w-1/3">ID:</span>
                <span className="w-2/3">{selectedParcel.declaration.id}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-1/3">ტიპი:</span>
                <span className="w-2/3">{selectedParcel.declaration.type}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-1/3">ფასი:</span>
                <span className="w-2/3">${selectedParcel.declaration.price}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-1/3">ვებსაიტი:</span>
                <a href={selectedParcel.declaration.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 w-2/3">
                  {selectedParcel.declaration.website}
                </a>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-1/3">კომენტარი:</span>
                <span className="w-2/3">{selectedParcel.declaration.comment}</span>
              </div>
              {selectedParcel.declaration.invoice_Pdf && (
                <div className="flex justify-center mt-6">
                  <Button
                    type="primary"
                    onClick={() => {
                      const blob = new Blob(
                        [new Uint8Array(selectedParcel.declaration.invoice_Pdf.data)],
                        { type: 'application/pdf' }
                      );
                      const url = URL.createObjectURL(blob);
                      window.open(url);
                    }}
                  >
                    ინვოისის ნახვა
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-500">დეკლერაცია არ მოიძებნა</p>
          )}
        </Modal>
      </div>
    </div>
  );
}
