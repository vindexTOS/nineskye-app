import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { FaTruckPlane } from "react-icons/fa6";
import { GiFinishLine } from "react-icons/gi";
import { FaGetPocket } from "react-icons/fa";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { GrRadialSelected } from "react-icons/gr";

export default function Parcel() {
  const navigate = useNavigate();
  const location = useLocation();

  // Local state to store the currently selected tab.
  const [selectedTab, setSelectedTab] = useState(location.pathname);
  // State to store the full path of the button that is loading.
  const [loadingTab, setLoadingTab] = useState<string | null>(null);

  // Sync selectedTab with location.pathname when it changes from outside this component.
  useEffect(() => {
    setSelectedTab(location.pathname);
  }, [location.pathname]);

  // Handler for button clicks.
  const handleClick = (tabSuffix: string) => {
    // Construct the full path for the button.
    const fullPath = `/user/parcel/${tabSuffix}`;
    // Set the loading indicator for the button.
    setLoadingTab(fullPath);

    // After 500ms, update the selected tab, clear the loading state, and navigate.
    setTimeout(() => {
      setSelectedTab(fullPath);
      setLoadingTab(null);
      navigate(tabSuffix);
    },120);
  };

  return (
    <div className="flex flex-col gap-8 p-4 pt-20 md:pt-40 max_Xll:flex-wrap mr-0">
      {/* Button Grid */}
      <div className="flex flex-wrap   max_md2:px-2   max_Xll:px-20 2xl:flex-nowrap gap-4 justify-center md:justify-start">
        <Button
          onClick={() => handleClick('storage')}
          type="primary"
          // Loading indicator shows when loadingTab matches this button’s full path.
          loading={loadingTab === "/user/parcel/storage"}
          className="relative md:w-[20rem] md:h-[10rem] w-[8rem] h-[5rem] text-[1rem] md:text-[1.2rem] bg-blue-500 hover:bg-blue-600 text-white flex flex-col items-center justify-center rounded-lg"
          icon={<HomeOutlined className="text-[1rem] md:text-[2.4rem]" />}
        >
          {selectedTab === "/user/parcel/storage" && (
            <div className="absolute top-2 left-2 w-5 h-5 pointer-events-none">
              <GrRadialSelected />
            </div>
          )}
          საწყობშია
        </Button>

        <Button
          onClick={() => handleClick('on-the-way')}
          type="primary"
          loading={loadingTab === "/user/parcel/on-the-way"}
          className="relative md:w-[20rem] md:h-[10rem] w-[8rem] h-[5rem] text-[1rem] md:text-[1.2rem] bg-red-500 hover:bg-red-600 text-white flex flex-col items-center justify-center rounded-lg"
          icon={<FaTruckPlane className="text-[1rem] md:text-[2.4rem]" />}
        >
          {selectedTab === "/user/parcel/on-the-way" && (
            <div className="absolute top-2 left-2 w-5 h-5 pointer-events-none">
              <GrRadialSelected />
            </div>
          )}
          გზაში
        </Button>

        <Button
          onClick={() => handleClick('arrived')}
          type="primary"
          loading={loadingTab === "/user/parcel/arrived"}
          className="relative md:w-[20rem] md:h-[10rem] w-[8rem] h-[5rem] text-[1rem] md:text-[1.2rem] bg-yellow-500 hover:bg-yellow-600 text-white flex flex-col items-center justify-center rounded-lg"
          icon={<GiFinishLine className="text-[1rem] md:text-[2.4rem]" />}
        >
          {selectedTab === "/user/parcel/arrived" && (
            <div className="absolute top-2 left-2 w-5 h-5 pointer-events-none">
              <GrRadialSelected />
            </div>
          )}
          ჩამოსულია
        </Button>

        <Button
          onClick={() => handleClick('taken-out')}
          type="primary"
          loading={loadingTab === "/user/parcel/taken-out"}
          className="relative md:w-[20rem] md:h-[10rem] w-[8rem] h-[5rem] text-[1rem] md:text-[1.2rem] bg-green-500 hover:bg-green-600 text-white flex flex-col items-center justify-center rounded-lg"
          icon={<FaGetPocket className="text-[1rem] md:text-[2.4rem]" />}
        >
          {selectedTab === "/user/parcel/taken-out" && (
            <div className="absolute top-2 left-2 w-5 h-5 pointer-events-none">
              <GrRadialSelected />
            </div>
          )}
          გატანილი
        </Button>
      </div>

      {/* Outlet Container */}
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
