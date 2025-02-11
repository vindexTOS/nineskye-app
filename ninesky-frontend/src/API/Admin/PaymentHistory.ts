import { ApiManager } from "../ApiManager";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getPaymentHistory = async (
  page: number,
  limit: number,
  sort: string,
  userId: string
) => {
  try {
    const token = cookies.get("token");
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sort,
      userId,
    }).toString();

    const res: any = await ApiManager.get(`/admin/payment-history?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching payment history:", error);
    const err:any = error
    throw new Error(err.message);
  }
};


export const getTransactionHistory = async (
    page: number,
    limit: number,
    sort: string,
    userId: string
  ) => {
    try {
      const token = cookies.get("token");
      const query = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort,
        userId,
      }).toString();
  
      const res: any = await ApiManager.get(`/admin/transaction-history?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return res.data;
    } catch (error) {
      console.error("Error fetching payment history:", error);
      const err:any = error
      throw new Error(err.message);
    }
  };
  
