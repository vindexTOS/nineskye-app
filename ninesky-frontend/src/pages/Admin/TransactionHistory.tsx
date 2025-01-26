import React, { useState } from 'react';
import { Table, Input, Button } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getTransactionHistory } from '../../API/Admin/PaymentHistory';
 
export default function TransactionHistory() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState('DESC');
  const [userId, setUserId] = useState('');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['transaction-history', page, limit, sort, userId],
    queryFn: () => getTransactionHistory(page, limit, sort, userId),
 
  });

  const handleSearch = () => {
    setPage(1); // Reset to the first page
    refetch();
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Transaction Type', dataIndex: 'transactionType', key: 'transactionType' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center mb-4 gap-4">
        <Input
          placeholder="Search by User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-1/3"
        />
        <Button type="primary" onClick={handleSearch}>
          Search
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
        rowKey={(record:any) => record.id}
        bordered
      />
    </div>
  );
}
