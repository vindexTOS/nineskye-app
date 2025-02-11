import React, { FC } from 'react';
import ParcelsCard from './ParcelsCard';
import { shippingStatusTranslation } from '../../types/shipping_status';

type ParcelsPropType = {
  data: any;
  color: string;
  title: string;
  refetch: any;
};

const ParcelsTable: FC<ParcelsPropType> = ({ data, color, title, refetch }) => {
  const [flights, setFlights] = React.useState<any[]>([]);
  const [currentPages, setCurrentPages] = React.useState<{ [key: string]: number }>({});
  const pageSize = 5; // Number of parcels to display per page

  // Update flights whenever `data` changes
  React.useEffect(() => {
    // console.log(data)
    setFlights(data || []);
    console.log(data)
  }, [data]);

  // Handle page change per flight
  const handlePageChange = (flightId: string, newPage: number) => {
    setCurrentPages((prev) => ({ ...prev, [flightId]: newPage }));
  };

  return (
    <div className="h-full space-y-6">
      <h1 className="text-[1.5rem] text-gray-400">{title}</h1>

      {flights.length > 0 ? (
        flights.map((flight: any) => {
          const flightId = flight.flight_id;
          const parcels = flight.parcels || [];
          const currentPage = currentPages[flightId] || 1;

          // Pagination Logic
          const startIndex = (currentPage - 1) * pageSize;
          const currentParcels = parcels.slice(startIndex, startIndex + pageSize);
          const totalPages = Math.ceil(parcels.length / pageSize);

          return (
            <div key={flightId} className="border border-gray-200 p-5 rounded-lg shadow-md ">
              {/* Flight Details */}
              <div className="bg-gray-100 p-4 rounded-md mb-4  py-5 ">
  <h2 className="text-lg font-semibold text-gray-700 mb-2">✈ ფრენის დეტალები</h2>
  <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-4  flex items-center justify-between">
    <span>
      <span className="font-semibold">ფრენის ID:</span> {flight.flight_id}
    </span>
    <span>
      <span className="font-semibold">ჩამოსვლის დრო:</span> {new Date(flight.arrived_at).toISOString().split('T')[0]}
    </span>
    <span>
      <span className="font-semibold">ქვეყანა:</span> {flight.flight_from}
    </span>
    <span>
      <span className="font-semibold">გადაზიდვის სტატუსი:</span> {shippingStatusTranslation[flight.shipping_status] || flight.shipping_status }
    </span>
  </div>
</div>


              {/* Parcels List */}
              <div className="space-y-4">
                {currentParcels.map((parcel: any, index: number) => (
                  <ParcelsCard key={index} refetch={refetch} parcel={parcel} color={color} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <button
                    className={`px-4 py-2 bg-gray-200 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(flightId, currentPage - 1)}
                  >
                    წინა
                  </button>
                  <span>{`Page ${currentPage} of ${totalPages}`}</span>
                  <button
                    className={`px-4 py-2 bg-gray-200 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(flightId, currentPage + 1)}
                  >
                    შემდეგი
                  </button>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 text-center">ფრენები არ მოიძებნა</p>
      )}
    </div>
  );
};

export default ParcelsTable;
