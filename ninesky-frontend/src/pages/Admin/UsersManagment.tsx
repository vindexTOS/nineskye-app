import React, { useEffect, useState } from 'react';
import { Table, Pagination, Button, Modal, Form, Input, message, Select ,Typography} from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GetAllUsers } from '../../API/User/GetRequests';
import Loading from '../../components/status/Loading';
 import { UpdateUserInfo } from '../../API/Admin/UpdateUser';
import { GetParcels, UpdateParcels } from '../../API/Admin/CreateParcels';
import {ShippingStatus, shippingStatusTranslation} from "../../types/shipping_status"
import { DeleteUser } from '../../API/Admin/DeleteRequests';
import { paymentStatusTranslation } from '../../types/payment';
export default function UsersManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalCurrentPage, setModalCurrentPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDetalseModalOpen, setIsDetalesModalOpen] = useState(false)
  const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false)
  const [detaledUserInfo, setDetaledUserInfo] = useState<any>()
  const [form] = Form.useForm();


const {Text} = Typography

  const shippingStatusOptions = Object.values(ShippingStatus).map((status) => ({
    label: status.charAt(0).toUpperCase() + status.slice(1), 
    value: status,
  }));


  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['many-users-info', searchTerm, currentPage],
    queryFn: () => GetAllUsers(searchTerm, currentPage, 10),
  });



  const deleteMutation = useMutation({
     mutationFn:(id:string)=>{
      return DeleteUser(id )
     },
     onSuccess(){
      message.success('მომხმარებელი წაიშალა');

     },
     onError(){
      message.error('შეცდომა მომხმარებელის წაშლა ვერ მოხერხდა!');

     }
  })

  const handleDeleteMutation = async (id:string)=>{
      await deleteMutation.mutateAsync(id)
  }
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const handleDelete = async (id: string ) => {
    setSelectedUserId(id)
    setIsDeleteModalOpen(true)
  };


  const handleDetales = async (userId: string, page = 1) => {
    setSelectedUserId(userId)
    setIsDetalesModalOpen(true);
    const data = await GetParcels('', userId, page, 10);
    // console.log(data)
    setDetaledUserInfo(data);
    setModalCurrentPage(page); // Set current page for modal pagination
  };

  // Handle modal pagination
  const handleModalPagination = async (page: any) => {
    // console.log(selectedUser)
    if (selectedUserId) {
      await handleDetales(selectedUserId, page); // Fetch data for the new page
    }
  };

  // Close the modal
  const handleCancelDetalesModal = () => {
    setIsDetalesModalOpen(false);
  };
  const handleEdit = (user: any) => {
    //  console.log(user)
    setSelectedUser(user);
    setIsModalOpen(true);
    delete user.userDetails.id
    user.userDetails.id = user.id
    form.setFieldsValue({
      ...user,
      ...user.userDetails,
    });
    // console.log(user)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handlePaginationChange = (page: any) => {
    setCurrentPage(page);
  };

  const mutation = useMutation({
    mutationFn: (body) => {

      return UpdateUserInfo(body);
    },
    onSuccess: () => {
      message.success('განახლება წარმატებით განხორციელდა');
      setIsModalOpen(false);
      setSelectedUser(null);

    },
    onError: (error) => {
      message.error("შეცდომა")
      message.error(error.message || 'An error occurred!');
    },
  });

  const handleFinish = (values: any) => {

    const updatedValues = {
      ...values,

    };

    updatedValues.phone_number = Number(updatedValues.phone_number)
    mutation.mutate(updatedValues);
  };

  const updateMutation = useMutation({
    mutationFn: (body: any) => {
      return UpdateParcels(body);
    },
    onError(err) {
      message.error("დაუდგენელი შეცდომა")
      console.log(err);
    },
    onSuccess() {
      message.success('ამანთი განახლდა');
      handleDetales(selectedUserId)

       
    },
  });

  const handleUpdate = (values: any) => {
    // console.log(values)
    const convertedValues = {
    ...values
    
    };

    updateMutation.mutate({ ...convertedValues });
  };

  const handleStatusChange = (id:any, newStatus:any) => {
    const parcel = detaledUserInfo.parcels.find((parcel:any) => parcel.id === id);
    if (parcel) {
      handleUpdate({
        ...parcel,
        shipping_status: newStatus,
      });
    }
  };
   const [selectedParcel, setSelectedParcel] = useState<any>(null);
    const [isDelecrationModalOpen,setIsDeclerationModalOpen] = useState(false)

  const handleOpenDeclaration = (parcel: any) => {
    setSelectedParcel(parcel);
    setIsDeclerationModalOpen(true);
  };
  const columns2 = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
     { title: 'ფასი', dataIndex: 'price', key: 'price' },
    { title: 'წონა', dataIndex: 'weight', key: 'weight' },
    { title: 'გადახდის სტატუსი', dataIndex: 'payment_status', key: 'payment_status',

           render: (text: string) => paymentStatusTranslation[text?.trim()] || text || 'უცნობი',
     },
    {
      title: 'გადაზიდვის სტატუსი',
      dataIndex: 'shipping_status',
      key: 'shipping_status',
          render: (text:string) => shippingStatusTranslation[text] || text,  
      // render: (text:any, record:any) => (
      //   <Select
      //     value={record.shipping_status}
      //     onChange={(value) => handleStatusChange(record.id, value)}
      //     options={shippingStatusOptions}
      //     style={{ width: 120 }}
      //   />
      // ),
    },
    {
      title: 'დეკლარაცია',
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
  ];





  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => (
        <div style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '120px', 
        }}>
          {id}
        </div>
      ),
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'სახელი', dataIndex: ['userDetails', 'first_name'], key: 'first_name' },
    { title: 'გვარი', dataIndex: ['userDetails', 'last_name'], key: 'last_name' },
    { title: 'ტელეფონის ნომერი', dataIndex: ['userDetails', 'phone_number'], key: 'phone_number' },
    { title: 'ID ნომერი', dataIndex: ['userDetails', 'personal_number'], key: 'personal_number' },
    { title: 'ოფისი', dataIndex: ['userDetails', 'office'], key: 'office' },
    { title: 'ქალაქი', dataIndex: ['userDetails', 'city'], key: 'city' },
    { title: 'მისამართი', dataIndex: ['userDetails', 'address'], key: 'address' },
    { title: 'დაშვების ლეველი', dataIndex: 'accessLevel', key: 'accessLevel' },
 
    {
      title: "დეტალები",
      key: 'detales',
      render: (_: any, parcel: any) => (
        <Button
          type="primary"
          style={{ backgroundColor: 'green', borderColor: 'green', color: 'white' }}
          onClick={() => handleDetales(parcel.id)}
        >
         ამანათები
        </Button>
      ),
    },
    
    {
      title: 'მოქმედება',
      key: 'action',
      render: (_: any, user: any) => (
        <Button type="primary" onClick={() => handleEdit(user)}>
          შეცვლა
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

  if (isPending) {
    return <Loading loading={isPending} />;
  }

  if (isError) {
    return <div>Error: {error.message || 'დაუდგენელი შეცდომა'}</div>;
  }

  return (
    <div className="p-10 min-h-screen">
      <div className="mx-auto bg-white rounded-lg p-8">
        <Input.Search
          placeholder="პირადი ნომრით ძებნა"
          onSearch={setSearchTerm}
          enterButton
          className="mb-6"
          size="large"
        />
        <Table
          columns={columns}
          dataSource={data?.data.
            parsedUser
            || []}
          loading={isPending}
          pagination={false}
          rowKey="id"
          className="mb-6"
        />
        <Pagination
          current={currentPage}
          total={data?.data?.totalCount}
          pageSize={10}
          onChange={handlePaginationChange}
          showSizeChanger={false}
          showQuickJumper
          simple
          className="text-center"
        />

<Modal
      title="ამანთის დეტალები"
      open={isDetalseModalOpen}
      onCancel={handleCancelDetalesModal}
      footer={null}
      width={800}
    >
      {detaledUserInfo ? (
        <Table
          dataSource={detaledUserInfo.parcels}
          rowKey="id"
          columns={columns2}
          pagination={false}
        />
      ) : (
        <Loading loading={!detaledUserInfo} />
      )}
      <Pagination
        current={modalCurrentPage}
        total={detaledUserInfo?.totalCount ? detaledUserInfo?.totalCount : 0}
        pageSize={10}
        onChange={handleModalPagination}
      />
    </Modal>
        <Modal title="Edit User" open={isModalOpen} onCancel={handleCancel} footer={null}>
          {selectedUser && (
            <Form form={form} layout="vertical" onFinish={handleFinish}>
              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>
              <Form.Item label="პაროლი" name="password">
                
                <Input.Password />
              </Form.Item>
              <Form.Item label="სახელი" name="first_name">
                <Input />
              </Form.Item>
              <Form.Item label="გვარი" name="last_name">
                <Input />
              </Form.Item>
              <Form.Item label="ტელეფონი" name="phone_number">
                <Input />
              </Form.Item>
              <Form.Item label="პირადი ნომერი" name="personal_number">
                <Input />
              </Form.Item>
              <Form.Item label="ოფისი" name="office">
                <Input />
              </Form.Item>
              <Form.Item label="ქალაქი" name="city">
                <Input />
              </Form.Item>
              <Form.Item label="მისამართი" name="address">
                <Input />
              </Form.Item>
              <Form.Item label="დაშვების დონე" name="accessLevel">
                <Input type="number" />
              </Form.Item>
              <Form.Item className="hidden" label="id" name="id">
                <Input type="text" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={mutation.isPending} className="w-full">
                  შენახვა
                </Button>
              </Form.Item>
            </Form>
          )}
        </Modal>
        {/*  */}
  {/* delete modal */}
  <Modal
      title="დეკლერაცის წაშლა"
      open={isDeleteModalOpen}
      onCancel={() => setIsDeleteModalOpen(false)}
      footer={null} // Custom footer instead of default buttons
    >
      <div style={{ textAlign: "center" }}>
        {/* Styled Question */}
        <Text strong style={{ fontSize: "16px" }}>
         დარწმუნებული ხართ რომ გსურთ ამ უსერის წაშლა ?
        </Text>
        
        {/* Action Buttons */}
        <div style={{ marginTop: "20px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              handleDeleteMutation(selectedUserId);
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
        <Modal
          title="დეკლერაცის დეტალები"
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
                <span className="w-2/3">₾{selectedParcel.declaration.price}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-1/3">Website:</span>
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
            <p className="text-center text-gray-500">დეკლერაცია ვერ მოინახა</p>
          )}
        </Modal>
      </div>
    </div>
  );
}