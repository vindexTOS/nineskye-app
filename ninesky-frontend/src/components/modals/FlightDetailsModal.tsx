import React from 'react';
import { Modal, Table, Typography } from 'antd';
import { shippingStatusTranslation } from '../../types/shipping_status';
import { paymentStatusTranslation } from '../../types/payment';

const { Text } = Typography;

export default function FlightDetailsModal({ getSingleFlightMutation }: any) {
    const flightData = getSingleFlightMutation?.data?.flights?.[0];

    return (
        <Modal
            title="შექმენით ახალი ფრენა"
            open={getSingleFlightMutation.isSuccess}
            onCancel={() => getSingleFlightMutation.reset()}
            footer={null}
            width={700}
        >
            {flightData && (
                <div className="space-y-6">

                    <div className="bg-gray-100 p-5 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-3 text-gray-800">✈ ფრენის დეტალები</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Text strong>ფრენის ID:</Text> <Text className="text-gray-700">{flightData.flight_id}</Text>
                            </div>
                            <div>
                                <Text strong>ქვეყანა:</Text> <Text className="text-gray-700">{flightData.flight_from}</Text>
                            </div>
                            <div>
                                <Text strong>ჩამოსვლის თარიღი:</Text>
                                <Text className="text-gray-700">{new Date(flightData.arrived_at).toISOString().split('T')[0]}</Text>
                            </div>
                            <div>
                                <Text strong>გადაზიდვის სტატუსი: </Text>
                                <Text className="text-gray-700">{shippingStatusTranslation[flightData.shipping_status] || flightData.shipping_status}</Text>
                            </div>
                        </div>
                    </div>

                    {/* Parcels Table */}
                    <div className="border border-gray-200 rounded-lg shadow-md p-4">
                        <h3 className="text-md font-semibold text-gray-800 mb-2">📦 ამანათები</h3>
                        <Table
                            columns={[
                                { title: 'ID', dataIndex: 'id', key: 'id' },
                                { title: 'წონა (კგ)', dataIndex: 'weight', key: 'weight' },
                                { title: 'ფასი (GEL)', dataIndex: 'price', key: 'price' },
                                {
                                    title: 'გადახდის სტატუსი', dataIndex: 'payment_status', key: 'payment_status', render: (text: string) => paymentStatusTranslation[text?.trim()] || text || 'უცნობი',
                                },
                            ]}
                            dataSource={flightData.parcels || []}
                            rowKey="id"
                            pagination={false}
                            className="border border-gray-200 rounded-lg"
                        />
                    </div>
                </div>
            )}
        </Modal>
    );
}
