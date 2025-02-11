import { useQuery } from '@tanstack/react-query';
import { GetUserInfo } from '../../../API/User/GetRequests';
import ParcelsTable from '../../../components/parcels/ParcelsTable';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';

export default function StorageUnit() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [storageData, setStorageData] = useState<any[]>([]);
  const cookies = new Cookies();

  useEffect(() => {
    const decodeUser = async () => {
      let token = cookies.get('token');
      if (token) {
        let decodedUser = jwt_decode(token);
        setUserInfo(decodedUser);
      }
    };

    decodeUser();
  }, []);

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['user-info'],
    queryFn: () => (userInfo ? GetUserInfo() : Promise.resolve()),
    enabled: !!userInfo,
  });

  useEffect(() => {
    if (data?.data?.flights) {
       
    
     let extractedFligts =  data.data.flights.filter((val:any)=>  val.shipping_status ==  'Brought') 
      setStorageData(extractedFligts);
    }
  }, [data]);

  if (isPending) return <div className="text-center text-gray-500">Loading...</div>;
  if (isError) return <div className="text-center text-red-500">Error: {error?.message}</div>;

  return (
    <ParcelsTable refetch={refetch} data={storageData} color={'#579cff'} title={'საწყობი'} />
  );
}
