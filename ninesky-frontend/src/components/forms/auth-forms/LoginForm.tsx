import React, { useState } from "react";
import { Modal, Input, Button, Form } from "antd";
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css"; // Import Ant Design styles
import "tailwindcss/tailwind.css"; // Import TailwindCSS styles
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { LoginType } from "../../../types/authTypes";
import { LoginPostRequest, passwordRecovery } from "../../../API/Auth/Auth";
import Loading from "../../status/Loading";
import ErrorModal from "../../status/Error";
import Swal from "sweetalert2";

export default function LoginForm() {
  const [visible, setVisible] = useState(false);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (body: LoginType) => {
      return LoginPostRequest(body);
    },
    onError(err) {
      console.log(err);
    },
    onSuccess() {
      navigate("/user/parcel/storage");
    },
  });

  const { isPending, error, isError } = mutation;

  const showModal = () => setVisible(true);
  const handleOk = () => setVisible(false);
  const handleCancel = () => setVisible(false);

  const showForgotPasswordModal = () => setForgotPasswordVisible(true);
  const handleForgotPasswordCancel = () => setForgotPasswordVisible(false);

  const onFinish = async (values: LoginType) => {
    await mutation.mutateAsync(values);
  };

  //  password recovery

  const passwordRecoveryMutation = useMutation({
    mutationFn: (email: string) => passwordRecovery(email),
    onSuccess() {
      Swal.fire({
        title: "წარმატება",
        text: "შეცვლის მოთხოვნა გაგზავნილია, გთხოვთ შეამოწმოთ თვენი ელ-ფოსტა",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    onError() {
      Swal.fire({
        title: "შეცდომა",
        text: "ელ-ფოსტა ვერ მოიძებნა",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });
  const handlePasswordReset = async (values: { email: string }) => {
    await passwordRecoveryMutation.mutateAsync(values.email);
    setForgotPasswordVisible(false);
  };

  return (
    <>
      {/* Login Button */}
      <Button
        onClick={showModal}
        type="primary"
        className="bg-blue-500 hover:bg-blue-700 text-white border-none rounded-md py-5 max_smm:w-[90%]"
      >
        <LoginOutlined />
        <span>შესვლა</span>
      </Button>

      {/* Login Modal */}
      <Modal
        title="შესვლა"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
        className="custom-modal"
      >
        <Form onFinish={onFinish} layout="vertical">
          <div className="p-4">
            <Form.Item
              label="ელ-ფოსტა"
              name="email"
              rules={[
                {
                  required: true,
                  message: "გთხოვთ შეიყვანოთ ელ-ფოსტა!",
                },
                { type: "email", message: "გთხოვთ შეიყვანოთ თქვენი ელ-ფოსტა!" },
              ]}
            >
              <Input
                placeholder="ელ-ფოსტა"
                prefix={<UserOutlined />}
                className="mb-3"
              />
            </Form.Item>
            <Form.Item
              label="პაროლი"
              name="password"
              rules={[
                { required: true, message: "გთხოვთ შეიყვანეთ პაროლი!" },
                { min: 6, message: "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო!" },
              ]}
            >
              <Input.Password placeholder="პაროლი" prefix={<LockOutlined />} />
            </Form.Item>

            <Button htmlType="submit" type="primary" block>
              შესვლა
            </Button>

            <Loading loading={isPending} />
            {isError && <ErrorModal error={error?.message || "შეცდომა"} />}

            {/* Forgot Password Link */}
            <div className="mt-4 text-center">
              <Button
                type="link"
                className="text-blue-500 hover:text-blue-700"
                onClick={showForgotPasswordModal}
              >
                დაგავიწყდა პაროლი?
              </Button>
            </div>
          </div>
        </Form>
      </Modal>

      {/* Forgot Password Modal */}
      <Modal
        title="პაროლის აღდგენა"
        visible={forgotPasswordVisible}
        onCancel={handleForgotPasswordCancel}
        footer={null}
        centered
        className="custom-modal"
      >
        <Form onFinish={handlePasswordReset} layout="vertical">
          <div className="p-4">
            <Form.Item
              label="ელ-ფოსტა"
              name="email"
              rules={[
                {
                  required: true,
                  message: "გთხოვთ შეიყვანოთ ელ-ფოსტა!",
                },
                { type: "email", message: "გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა!" },
              ]}
            >
              <Input
                placeholder="შეიყვანეთ ელ-ფოსტა"
                prefix={<MailOutlined />}
              />
            </Form.Item>

            <Button htmlType="submit" type="primary" block>
              გამოგზავნა
            </Button>
          </div>
        </Form>
      </Modal>

      <style jsx>{`
        .custom-modal .ant-modal {
          backdrop-filter: blur(10px); /* Apply blur effect to background */
          -webkit-backdrop-filter: blur(10px); /* For Safari */
        }
      `}</style>
    </>
  );
}
