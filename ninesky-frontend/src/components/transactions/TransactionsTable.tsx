import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { GetUserInfo } from '../../API/User/GetRequests';
 
export default function TransactionsTable() {

  const userInfo = useQuery({queryKey:['get-user-info'],
    queryFn:()=>GetUserInfo()
   
    })

  // Total number of transactions
  const [totalTransactions, setTotalTransactions] = useState(10)
  const pageSize = 10; // Number of transactions per page
  const [currentPage, setCurrentPage] = useState(1);
   const [data,setData] = useState([])
  useEffect(()=>{
    if(userInfo.data){
      console.log()
      setTotalTransactions(userInfo.data.data.transactions.length)
  
    }
   },[userInfo])

  // Sample data for the table
  // const data = Array.from({ length: totalTransactions }, (_, index) => ({
  //   key: index + 1,
  //   transactionId: `T00${index + 1}`,
  //   amount: `$${(Math.random() * 200).toFixed(2)}`,
  //   date: `2024-01-${String(index + 1).padStart(2, '0')}`,
  // }));

  // Calculate the current page data
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = userInfo.data.data.transactions.slice(startIndex, startIndex + pageSize);

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
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    // {
    //   title: 'ბარათი',
    //   dataIndex: 'masked_card',
    //   key: 'masked_card',
    // },
    // {
    //   title: 'payment_id',
    //   dataIndex: 'payment_id',
    //   key: 'payment_id',
    // },
    
  ];

  // Handle page change
  const handlePageChange = (newPage:number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(userInfo.data.data.transactions.length / pageSize);

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
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
          წინა </Button>
          <span>{`გვერდი ${currentPage} -  ${totalPages}`}</span>
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