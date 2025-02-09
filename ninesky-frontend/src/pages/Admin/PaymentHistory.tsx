import React, { useState } from 'react';
import { Table, Input, Button } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getPaymentHistory } from '../../API/Admin/PaymentHistory';

export default function PaymentHistory() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState('DESC');
  const [userId, setUserId] = useState('');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['payment-history', page, limit, sort, userId],
    queryFn: () => getPaymentHistory(page, limit, sort, userId),
 
  });

  const handleSearch = () => {
    setPage(1); 
    refetch();
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'მომხმარებლის ID', dataIndex: 'userId', key: 'userId' },
    { title: 'რაოდენობა', dataIndex: 'amount', key: 'amount' },
    { title: 'ვალუტა', dataIndex: 'currency', key: 'currency' },
    { title: 'გადახდის ID', dataIndex: 'payment_id', key: 'payment_id' },
    { title: 'შენიღბული ბარათი', dataIndex: 'masked_card', key: 'masked_card' },
    { title: 'გადახდის თარიღი', dataIndex: 'date', key: 'date' },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center mb-4 gap-4">
        <Input
          placeholder="მოძებნეთ მომხარებლის ID-ით"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-1/3"
        />
        <Button type="primary" onClick={handleSearch}>
          ძებნა
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total || 0,
          onChange: (page, pageSize) => {
            setPage(page);
            setLimit(pageSize);
          },
        }}
        rowKey={(record:any) => record?.id}
        bordered
      />
    </div>
  );
}
