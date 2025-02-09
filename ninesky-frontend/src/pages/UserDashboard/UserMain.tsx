import { useState } from "react";
import {
  Layout,
  Menu,
  Modal,
  Button,
  Drawer,
  Grid,
} from "antd";
import {
  SettingOutlined,
  DropboxOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  LogoutOutlined,
  BankOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Swal from "sweetalert2";

import { Content } from "antd/es/layout/layout";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import BalanceModal from "../../components/modals/BalanceModal";

const { Sider } = Layout;
// Use Ant Design’s grid hook to detect responsive breakpoints
const { useBreakpoint } = Grid;

export default function UserMain() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  // State for opening the balance modal
  const [balacneModal, setBalanceModal] = useState(false);

  // State for tracking the currently selected menu item
  const [selectedKey, setSelectedKey] = useState("parcel/storage");

  // For desktop: use a "collapsed" state to toggle the Sider width
  const [collaps, setCollaps] = useState(true);
  // For mobile: control Drawer visibility with a separate state
  const [menuVisible, setMenuVisible] = useState(false);

  // Determine if we’re on a mobile device.
  // Here we assume “mobile” is when the screen is below the “md” breakpoint.
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const onBalanceCLose = () => {
    setBalanceModal(false);
  };

  // Update the menu selection and close the mobile drawer (if open)
  const handleMenuSelect = async ({ key }: { key: string }) => {
    if (key === "logout") {
      // Show SweetAlert2 confirmation
      const result = await Swal.fire({
        title: "ნამდვილად გსურთ გამოსვლა ?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "დიახ, log out",
        cancelButtonText: "არა, cancel",
        customClass: {
          container: "custom-swal-container",
          title: "custom-swal-title",
          content: "custom-swal-content",
        },
      });

      if (result.isConfirmed) {
        cookies.remove("token", { path: "/" });
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } else if (key === "balance") {
      setBalanceModal(true);
      if (isMobile) setMenuVisible(false);
    } else {
      setSelectedKey(key);
      navigate(key);
      if (isMobile) setMenuVisible(false);
    }
  };

  return (
    <Layout style={{ height: "100%" }}>
      {/* Desktop: Render the fixed blue Sider */}
      {!isMobile && (
        <Sider
          collapsible
          collapsed={collaps}
          style={{
            overflow: "auto",
            height: "100%",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 10000,
            backgroundColor: "#0289cc", // Blue sidebar
          }}
        >
          <div
            className="logo"
            style={{ margin: "16px", textAlign: "center" }}
          >
            {/* Toggle icon to collapse/expand the sidebar */}
            {!collaps ? (
              <IoIosArrowBack
                onClick={() => setCollaps(!collaps)}
                className="text-white text-[2.5rem]"
              />
            ) : (
              <IoIosArrowForward
                onClick={() => setCollaps(!collaps)}
                className="text-white text-[2.5rem]"
              />
            )}
          </div>
          <Menu
            className="custom-menu"
            style={{
              backgroundColor: "#0289cc",
            }}
            mode="inline"
            selectedKeys={[selectedKey]}
            onSelect={handleMenuSelect}
          >
            <Menu.Item key="parcel/storage" icon={<DropboxOutlined />}>
              ამანათები
            </Menu.Item>
            <Menu.Item key="address" icon={<EnvironmentOutlined />}>
              მისამართები
            </Menu.Item>
            <Menu.Item key="balance" icon={<BankOutlined />}>
              ბალანსის შევსება
            </Menu.Item>
            <Menu.Item key="transactions" icon={<DollarOutlined />}>
              ტრანზაქციები
            </Menu.Item>
            <Menu.Item key="settings" icon={<SettingOutlined />}>
              პარამეტრები
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
              გამოსვლა
            </Menu.Item>
          </Menu>
        </Sider>
      )}

      {/* The main layout area.
          Note: We adjust left margin on desktop so that content does not hide under the Sider.
          On mobile we remove the margin so that the content uses the full width.
      */}
      <Layout
        className={`site-layout ${
          !isMobile ? (collaps ? "ml-[50px]" : "ml-[200px]") : ""
        }`}
      >
        {/* Mobile: Render a hamburger button and a Drawer for the menu */}
        {isMobile && (
          <>
            <Button
              type="primary"
              onClick={() => setMenuVisible(true)}
              style={{
                position: "fixed",
                top: 16,
                left: 16,
                zIndex: 10001,
              }}
            >
              <MenuOutlined />
            </Button>
            <Drawer
              placement="left"
              closable
              onClose={() => setMenuVisible(false)}
              visible={menuVisible}
              bodyStyle={{ padding: 0 }}
            >
              <Menu
                className="custom-menu h-[100vh] bg-blue-400"
                mode="inline"
                selectedKeys={[selectedKey]}
                onSelect={handleMenuSelect}
              >
                <Menu.Item key="parcel/storage" icon={<DropboxOutlined />}>
                  ამანათები
                </Menu.Item>
                <Menu.Item key="address" icon={<EnvironmentOutlined />}>
                  მისამართები
                </Menu.Item>
                <Menu.Item key="balance" icon={<BankOutlined />}>
                  ბალანსის შევსება
                </Menu.Item>
                <Menu.Item key="transactions" icon={<DollarOutlined />}>
                  ტრანზაქციები
                </Menu.Item>
                <Menu.Item key="settings" icon={<SettingOutlined />}>
                  პარამეტრები
                </Menu.Item>
                <Menu.Item key="logout" icon={<LogoutOutlined />}>
                  გამოსვლა
                </Menu.Item>
              </Menu>
            </Drawer>
          </>
        )}

        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <Modal
            title="შეივსე ბალანსი"
            open={balacneModal}
            onCancel={onBalanceCLose}
            footer={null}
          >
            <BalanceModal />
          </Modal>
          <div className="min-h-[100vh] h-[100%] w-[100%] flex items-center justify-center">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
