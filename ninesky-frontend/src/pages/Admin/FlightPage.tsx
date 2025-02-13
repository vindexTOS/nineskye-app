import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
  Table,
  Select,
  message,
  Pagination,
  Typography,
} from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CreateFlightType } from '../../types/flight.type';
import { CreateFlight, GetFlights, UpdateFlight } from '../../API/Admin/ParcelAndFlights';
import FlightDetailsModal from '../../components/modals/FlightDetailsModal';
import { Gvamunateben, ShippingStatus, shippingStatusTranslation } from '../../types/shipping_status';

const { Text } = Typography;

export default function SimpleParcelPage() {
  // Create modal state & form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Edit modal state, form and selected flight
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFlight, setEditingFlight] = useState<any>(null);
  const [editForm] = Form.useForm();

  // Pagination & search
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [searchById, setSearchById] = useState("");

  // Open/close create modal
  const openModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Create flight submission
  const onFinish = async (values: any) => {
    const body: CreateFlightType = {
      flight_id: values.flight_id,
      flight_from: values.flight_from,
      arrived_at: values.arrived_at,  
  
    };
    setIsModalOpen(false);
    await createFlightMutation.mutateAsync(body);
  };

  const createFlightMutation = useMutation({
    mutationFn: (body: CreateFlightType) => CreateFlight(body),
    onSuccess: () => {
      closeModal();
      message.success("ფრენა წარმატებით შეიქმნა");
      flightData.refetch();
    },
    onError: (err: any) => {
      closeModal();
      message.error(err.message + " ფრენა ვერ შეიქმნა");
    },
  });

  // Fetch flights
  const flightData = useQuery({
    queryKey: ["get-flights", { page: pagination.page, limit: pagination.limit }],
    queryFn: () => GetFlights(pagination.page, pagination.limit, searchById),
  });

  // Get single flight (for details)
  const getSingleFlightMutation = useMutation({
    mutationFn: (id: string) => GetFlights(pagination.page, pagination.limit, id),
  });
  const openSingleFlight = async (id: string) => {
    await getSingleFlightMutation.mutateAsync(id);
  };

  useEffect(() => {
    console.log(getSingleFlightMutation.data);
  }, [getSingleFlightMutation]);

  // --- Edit Flight ---
  const updateFlightMutation = useMutation({
    mutationFn: ({ body, id }: { body: CreateFlightType; id: string }) => UpdateFlight(body, id),
    onSuccess: () => {
      message.success("ფრენა წარმატებით განახლდა");
      setIsEditModalOpen(false);
      flightData.refetch();
    },
    onError: (err: any) => {
      message.error(err.message + " ფრენა ვერ განახლდა");
    },
  });

  const openEditModal = (flight: any) => {
    setEditingFlight(flight);
    setIsEditModalOpen(true);
    // Pre-fill the edit form with the flight's current values.
    // Since arrived_at is a string (YYYY-MM-DD), we can set it directly.
    editForm.setFieldsValue({
      flight_id: flight.flight_id,
      flight_from: flight.flight_from,
      shipping_status: flight.shipping_status,
      arrived_at: flight.arrived_at,
    });
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const onEditFinish = async (values: any) => {
    const body: CreateFlightType = {
      flight_id: values.flight_id,
      flight_from: values.flight_from,
      shipping_status: values.shipping_status,
      arrived_at: values.arrived_at, 
    };
    await updateFlightMutation.mutateAsync({ body, id: values.flight_id });
  };

  // Table columns (added an edit button)
  const columns = [
    { title: 'ფრენის ID', dataIndex: 'flight_id', key: 'flight_id' },
    { title: 'ქვეყანა', dataIndex: 'flight_from', key: 'flight_from' },
    {
      title: 'სტატუსი',
      dataIndex: 'shipping_status',
      key: 'shipping_status',
      render: (text: string) => shippingStatusTranslation[text] || text,
    },
    {
      title: 'ჩამოსვლის თარიღი',
      dataIndex: 'arrived_at',
      key: 'arrived_at',
      render: (text: any) => text, // a string value
    },
    {
      title: 'ამანათები',
      key: 'action',
      render: (_: any, flightObj: CreateFlightType) => (
        <Button type="primary" onClick={() => openSingleFlight(flightObj.flight_id)}>
          ვრცლად
        </Button>
      ),
    },
    {
      title: 'რედაქტირება',
      key: 'edit',
      render: (_: any, flightObj: any) => (
        <Button type="default" onClick={() => openEditModal(flightObj)}>
          რედაქტირება
        </Button>
      ),
    },
  ];

  return (
    <div className="p-10">
      <div className="mx-auto bg-white rounded-lg p-8">
        {/* Create Flight Button */}
        <Button type="primary" onClick={openModal}>
          + შექმენი რეისი
        </Button>

        {/* Create Flight Modal */}
        <Modal title="შექმენით ახალი ფრენა" open={isModalOpen} onCancel={closeModal} footer={null}>
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
              <Input type="date" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                შენახვა
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Edit Flight Modal */}
        <Modal title="რედაქტირება ფრენა" open={isEditModalOpen} onCancel={closeEditModal} footer={null}>
          <Form form={editForm} layout="vertical" onFinish={onEditFinish}>
            <Form.Item label="ფრენის იდენტიფიკატორი" name="flight_id">
              <Input disabled />
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
              label="შიპინგ სტატუსი"
              name="shipping_status"
              rules={[{ required: true, message: 'გთხოვთ აირჩიოთ შიპინგ სტატუსი' }]}
            >
              <Select placeholder="Select shipping status">
                {Object.values(ShippingStatus).map((status) => (
                  <Select.Option key={status} value={status}>
                    {Gvamunateben[status] || status}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="ჩამოსვლის დრო"
              name="arrived_at"
              rules={[{ required: true, message: 'მონიშნეთ ჩამოსვლის დრო' }]}
            >
              <Input type="date" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                განახლება
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Flights Table */}
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
          onChange={(page) => setPagination((prev) => ({ ...prev, page }))}
          style={{ marginTop: '16px', textAlign: 'center' }}
        />

        <FlightDetailsModal getSingleFlightMutation={getSingleFlightMutation} />
      </div>
    </div>
  );
}
