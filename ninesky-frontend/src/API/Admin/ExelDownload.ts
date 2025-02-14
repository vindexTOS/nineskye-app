 
 import { ApiManager } from "../ApiManager";
 import Cookies from "universal-cookie";
 const cookies = new Cookies();
 
 
 export const DownloadExel = async (flight_id:string) => {
    try {
        const token = cookies.get("token");
        const res: any = await ApiManager(`admin/get-document?flight_id=${flight_id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
      
        });
        return res;
      } catch (error) {
        console.log(error);
        const err: any = error;
        throw new Error(err);
      }
 }

   
 