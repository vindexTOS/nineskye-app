import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Avatar } from "antd";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import { GetUserInfo } from "../../API/User/GetRequests";

export default function AuthNavBar() {
  const [userInfo, setUserInfo] = useState<any>();
  const [decodedUser, setDecodedUser] = useState<any>(null);
  const cookies = new Cookies();

  const decodeCookie = () => {
    const token = cookies.get("token");
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
      const fetchUserData = async () => {
        const data: any = await GetUserInfo();
        setUserInfo({ ...decodedUser, ...data?.data });
      };
      fetchUserData();
    }
  }, [decodedUser]);

  if (userInfo?.email && decodedUser.accessLevel == 1) {
    return (
      <nav className="fixed top-0 left-0 w-full bg-[#2fb9ff] px-4 py-3 md:py-4 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <div>
            <h1 className="text-white font-bold text-base md:text-xl">
              NineSky
            </h1>
          </div>
          {/* User Info Section */}
          <div className="flex items-center space-x-4">
            {/* Balance Box */}
            <div className="bg-white rounded-lg px-3 py-1 text-center">
              <p className="text-gray-500 text-[10px] md:text-xs">ბალანსი</p>
              <p className="text-green-800 text-[10px] md:text-sm font-semibold">
                ₾{userInfo.balance.toFixed(2)}
              </p>
            </div>
            {/* Avatar (hidden on mobile) */}
            <Avatar
              size="large"
              icon={<UserOutlined />}
              className="hidden md:block"
            />
            {/* User Details */}
            <div className="flex flex-col text-right">
              <span className="text-white text-xs md:text-sm font-medium">
                {userInfo.email}
              </span>
              <span className="text-red-200 text-[10px] md:text-xs">
                ID: {userInfo.id}
              </span>
            </div>
            {/* Logout Button (optional) */}
            {/* <Button
              type="text"
              icon={<LogoutOutlined style={{ color: "white", fontSize: "18px" }} />}
            /> */}
          </div>
        </div>
      </nav>
    );
  }

  return null;
}
