import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { GetUserInfo } from '../../API/User/GetRequests';

export default function TransactionsTable() {
  const userInfo = useQuery({
    queryKey: ['get-user-info'],
    queryFn: () => GetUserInfo(),
  });

  const pageSize = 10;  
  const [currentPage, setCurrentPage] = useState(1);

 
  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleString('ka-GE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    });
  };

  // Calculate the current page data
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = userInfo?.data?.data?.transactions
    ?.slice(startIndex, startIndex + pageSize)
    ?.map((transaction: any) => ({
      ...transaction,
      amount:`₾${transaction.amount}`,
      date: formatDate(transaction.date).split("GMT+4")[0], // Format the date here
    }));

  const columns = [
    {
      title: 'თანხა',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'ტრანზაქცის ტიპი',
      dataIndex: 'transactionType',
      key: 'transactionType',
    },
    {
      title: 'თარიღი',
      dataIndex: 'date',
      key: 'date',
    },
    // {
    //   title: 'id',
    //   dataIndex: 'id',
    //   key: 'id',
    // },
  ];

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(userInfo?.data?.data?.transactions?.length / pageSize);

  return (
    <div className="w-full h-full mt-40 md:ml-0 ml-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-[1.5rem] text-gray-400">ტრანზაქციები</h1>

        <Table
          dataSource={currentData}
          columns={columns}
          pagination={false}
          locale={{ emptyText: 'ტრანზაქციები არ მოიძებნა' }}
          className="mt-4"
        />

        <div className="flex justify-between items-center mt-4">
          <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            წინა
          </Button>
          <span>{`გვერდი ${currentPage} - ${totalPages}`}</span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            შემდეგი
          </Button>
        </div>
      </div>
    </div>
  );
}
