import React from "react";
import { Form, Input, Button, Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { sendNewPassword } from "../../API/Auth/Auth";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export default function PasswordRecovery() {
  const { token } = useParams(); // Get token from URL
  const nav = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      sendNewPassword(token, password),

    onSuccess(res) {
      const decodedToken: any = jwt_decode(res.data.access_token);
      const expirationTime = decodedToken.exp * 1000;
      const expirationDate = new Date(expirationTime);
      cookies.set("token",res.data.access_token, { path: "/", expires: expirationDate });
 
      setTimeout(() => {
        nav("/user/parcel/storage");
      }, 500);
    },

    onError() {
      Swal.fire({
        title: "შეცდომა",
        text: "პაროლის შეცვლა ვერ მოხერხდა",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const handleMutation = async (values: { password: string }) => {
    if (!token) {
      Swal.fire({
        title: "შეცდომა",
        text: "არასწორი ტოკენი!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    await mutation.mutateAsync({ token, password: values.password });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-[400px] shadow-lg">
        <h2 className="text-center text-2xl font-semibold mb-4">
          პაროლის აღდგენა
        </h2>
        <Form layout="vertical" onFinish={handleMutation} autoComplete="off">
          {/* New Password Field */}
          <Form.Item
            label="ახალი პაროლი"
            name="password"
            rules={[
              { required: true, message: "გთხოვთ, შეიყვანოთ პაროლი" },
              { min: 8, message: "პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო" },
            ]}
          >
            <Input.Password placeholder="შეიყვანეთ ახალი პაროლი" />
          </Form.Item>

          {/* Confirm Password Field */}
          <Form.Item
            label="გაიმეორეთ პაროლი"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "გთხოვთ, გაიმეოროთ პაროლი" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("პაროლები არ ემთხვევა!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="გაიმეორეთ პაროლი" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={mutation.isPending} // Show loading state
              disabled={mutation.isPending} // Prevent multiple clicks
            >
              {mutation.isPending ? "იტვირთება..." : "შეცვალე პაროლი"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
