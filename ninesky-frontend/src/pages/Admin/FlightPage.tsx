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
import { DownloadExel } from '../../API/Admin/ExelDownload';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
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

// ექსელი download exel ///////////////////



const exportToExcel = (data: any[]) => {
  // Mapping of original keys to Georgian column titles
  const columnMapping: { [key: string]: string } = {
    tracking_id: "ტრეკინგის ID",
    personal_number: "პირადი ნომერი",
    first_name: "სახელი",
    last_name: "გვარი",
    phone_number: "ტელეფონის ნომერი",
    address: "მისამართი",
    country_code: "ქვეყნის კოდი",
    weight: "წონა",
    gz_type: "გზის ტიპი",
    dab_type: "დაბ-ის ტიპი",
    registration_date: "რეგისტრაციის თარიღი",
    arrived_date: "მოსვლის თარიღი",
    document_number: "დოკუმენტის ნომერი",
    tranporting_cost_1: "ტრანსპორტირების ხარჯი 1",
    tranporting_cost_1_currency: "ტრანსპორტირების ხარჯი 1 ვალუტა",
    tranporting_cost_2: "ტრანსპორტირების ხარჯი 2",
    tranporting_cost_2_currency: "ტრანსპორტირების ხარჯი 2 ვალუტა",
    tranporting_cost_off: "ტრანსპორტირების დანარჩენი ხარჯი",
    tranporting_cost_off_currency: "ტრანსპორტირების დანარჩენი ხარჯის ვალუტა",
    race_id: "რესი",
    resident: "რეზიდენტობა"
  };

  // Map the original data keys to Georgian titles
  const mappedData = data.map((item) => {
    const newItem: any = {};
    Object.keys(item).forEach((key) => {
      newItem[columnMapping[key] || key] = item[key];
    });
    return newItem;
  });

  // Create a worksheet from the mapped data
  const worksheet = XLSX.utils.json_to_sheet(mappedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Generate Excel file buffer
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

  // Trigger file download using FileSaver
  saveAs(blob, "export.xlsx");
};

  const downloadExelMutation =  useMutation({
     mutationFn:(flight_id:string) => DownloadExel(flight_id),
      onSuccess: (data) => {
        message.success("ფაილის გადმოწერა დაიწყო");
        exportToExcel(data.data);
      },
      onError: (err: any) => {
        console.log(err)
        message.success("ფაილის გადმოწერა ვერ მოხერხდა ცადეთ თავიდან");
      }
  })

  const handleDownloadExelMutation = async (flight_id:any) => {
    const id = flight_id.flight_id
    await downloadExelMutation.mutateAsync(id);
  }

  
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
      render: (text: any) => text ? text.slice(0, 10) : ""
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
    {
      title: 'გადმოიწერე Excel',
      key: 'download',
      render: (_: any, flightObj: any) => (
        <Button
          type="default"
          style={{ backgroundColor: 'green', borderColor: 'green', color: 'white' }}
          onClick={() => handleDownloadExelMutation(flightObj)}
        >
          გადმოწერა 
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
