import React, { useEffect, useState } from 'react';
import { GetPrice, UpdatePrice } from '../../API/Price/PriceManagment';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, Divider, Input, Button, message } from 'antd';

export default function PriceManagment() {
  const [prices, setPrices] = useState<any>(null);

  // Fetch prices
  const { data, refetch } = useQuery({
    queryKey: ['parcels-price'],
    queryFn: () => GetPrice(),
  });

  useEffect(() => {
    if (data?.data) {
      setPrices(data.data);
    }
  }, [data]);

  // Update price mutation
  const updatePriceMutation = useMutation({
    mutationFn: (updatedPrices) => UpdatePrice(updatedPrices),
    onSuccess: () => {
      message.success('შეცვლა წარმატებით განხორციელდა');
      refetch();
    },
    onError: (error: any) => {
      message.error(error.message || 'დაუდგენელი შეცდომა');
    },
  });

  // Handle input change for updating prices (update the nested regularPrice object)
  const handleInputChange = (country: string, value: string) => {
    setPrices((prevPrices: any) => ({
      ...prevPrices,
      regularPrice: {
        ...prevPrices.regularPrice,
        [country]: value,
      },
    }));
  };

  // Handle save button click
  const handleSave = () => {
    if (prices) {
      // Prepare the data to match the API requirements
      const updateData: any = {
        china: parseFloat(prices.regularPrice.China),
        turkey: parseFloat(prices.regularPrice.Turkey),
      };

      updatePriceMutation.mutate(updateData);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">ფასის მენეჯმენტი</h2>
      <Card className="max-w-lg mx-auto p-6 shadow-md rounded-lg">
        {prices && prices.regularPrice && Object.keys(prices.regularPrice).length > 0 && (
          Object.entries(prices.regularPrice)
            // Filter out the key "id" if needed
            .filter(([key]) => key !== 'id')
            .map(([country, price]: any) => (
              <div key={country}>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold">{country}</span>
                  <div className="flex items-center">
                    <Input
                      value={price}
                      onChange={(e) => handleInputChange(country, e.target.value)}
                      style={{ width: '100px' }}
                    />
                    <span className="ml-2">ლარი</span>
                  </div>
                </div>
                <Divider className="my-1" />
              </div>
            ))
        )}
        <Button
          type="primary"
          className="mt-4 w-full"
          onClick={handleSave}
          loading={updatePriceMutation.isPending}
        >
          ცვლილების შენახვა
        </Button>
      </Card>
    </div>
  );
}
