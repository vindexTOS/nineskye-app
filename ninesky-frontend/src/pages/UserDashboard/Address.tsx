import React, { useEffect, useState } from 'react';
import { GetUserInfo } from '../../API/User/GetRequests';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';
import { useQuery } from '@tanstack/react-query';
import { getAddress } from '../../API/Admin/AddresssGet';

export default function Address() {
  const [userInfo, setUserInfo] = useState<any>();
  const [decodedUser, setDecodedUser] = useState<any>(null);
  const cookies = new Cookies();
  const [selectedCountry, setSelectedCountry] = useState<'China' | 'Turkey'>('China');
  const [infoData, setInfoData] = useState<any>(null);

  // Fetch addresses from API
  const { data: addressData, isLoading, error } = useQuery({
    queryKey: ["get-address"],
    queryFn: () => getAddress(),
  });

  useEffect(() => {
    console.log("Fetched Addresses:", addressData);
  }, [addressData]);

  const decodeCookie = () => {
    const token = cookies.get('token');
    if (token) {
      const decoded = jwt_decode(token);
      setDecodedUser(decoded);
    }
  };

  useEffect(() => {
    decodeCookie();
  }, []);

  useEffect(() => {
    if (decodedUser && decodedUser.sub) {
      const fetchData = async () => {
        const data: any = await GetUserInfo();
        setUserInfo({ ...decodedUser, ...data?.data });
      };
      fetchData();
    }
  }, [decodedUser]);

  useEffect(() => {
    if (userInfo && addressData) {
      const filteredAddresses = addressData.reduce((acc: any, address: any) => {
        const country = address.Country; // Assuming `Country` holds "China" or "Turkey"

        if (!acc[country]) {
          acc[country] = {};
        }

        acc[country] = {
          'First Name': userInfo.userDetails.first_name,
          'Last Name': userInfo.userDetails.last_name,
          'Province': address.Province,
          'District': address.District,
          'Street': address.Street,
          'Address': `${decodedUser.sub} - ${address.Address}`,
          'TEL': address.TEL,
          'ZIP': address.ZIP,
        };

        return acc;
      }, {});

      setInfoData(filteredAddresses);
    }
  }, [userInfo, addressData]);

  const handleCountrySwitch = (country: 'China' | 'Turkey') => {
    setSelectedCountry(country);
  };

  return (
    <section className="p-8  max_smm1:pt-40">
      <div className="flex justify-center mb-8">
        <button
          className={`px-10 py-4 mx-4 rounded-lg text-xl transition-all duration-300 transform ${
            selectedCountry === 'China' ? 'bg-blue-400 text-white shadow-lg scale-105' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => handleCountrySwitch('China')}
        >
          ჩინეთი
        </button>
        <button
          className={`px-10 py-4 mx-4 rounded-lg text-xl transition-all duration-300 transform ${
            selectedCountry === 'Turkey' ? 'bg-blue-400 text-white shadow-lg scale-105' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => handleCountrySwitch('Turkey')}
        >
          თურქეთი
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-8 rounded-lg border border-gray-200 shadow-xl bg-white bg-opacity-80 backdrop-blur-lg transition-all duration-300">
        {isLoading ? (
          <p className="text-center text-xl text-gray-600">Loading addresses...</p>
        ) : error ? (
          <p className="text-center text-xl text-red-500">Failed to load addresses.</p>
        ) : infoData && infoData[selectedCountry] ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(infoData[selectedCountry]).map(([key, value]: any) => (
              <div key={key} className="flex flex-col mb-4 border-b pb-4">
                <span className="text-lg font-semibold text-gray-700 mb-2">{key}:</span>
                <span className="text-xl font-medium text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-gray-600">No address data available.</p>
        )}
      </div>
    </section>
  );
}
