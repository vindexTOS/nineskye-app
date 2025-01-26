 import { Form, Input, Button, message } from 'antd';
 
 import { useMutation, useQuery } from '@tanstack/react-query';
import { callBackToPay } from '../../API/User/Payment';
import { paymenttype } from '../../types/payment';
import { GetUserInfo } from '../../API/User/GetRequests';
import { useNavigate } from 'react-router-dom';
 

 
export default function BalanceModal() {
   
 const userInfo = useQuery({queryKey:['get-user-info'],
 queryFn:()=>GetUserInfo()

 })
 const mutation = useMutation({
     mutationFn:(body:paymenttype)=> {
        return callBackToPay(body)
     },
     onSuccess(data){
         message.success("Succsess")
         window.location.replace (data.data.response.checkout_url)

     },
     onError(){
         message.error("Something went wrong")
     }
 })    
  const onFinish = async (values:any) => {
     
      const obj = {
        customerFirstName:userInfo.data.data.userDetails.first_name,
        customerLastName:userInfo.data.data.userDetails.last_name,
        amount:values.amount ,
        userId:userInfo.data.data.id,
        currency:"GEL"
      }

    await mutation.mutateAsync(obj)

  };
 
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">შეიყვანეთ თანხა</h2>
      <Form
        onFinish={onFinish}
        layout="vertical"
        className="w-full max-w-sm"
      >
        <Form.Item
          name="amount"
          label="თანხა ლარებში"
          rules={[
            { required: true, message: 'გთხოვთ შეიყვანოთ თანხა' },
            { type: 'number', min: 1, message: 'თანხა უნდა იყოს 1 ან მეტი', transform: value => Number(value) },
          ]}
        >
          <Input
            type="number"
            placeholder="შეიყვანეთ თანხა"
          />
        </Form.Item>
        <Form.Item>
          <Button loading={mutation.isPending} type="primary" htmlType="submit" className="w-full">
            გადახდა
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
