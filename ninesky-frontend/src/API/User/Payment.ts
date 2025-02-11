import { paymenttype } from "../../types/payment";
import { ApiManager } from "../ApiManager";


export const callBackToPay = async (body: paymenttype) => {
   
    try {
        const res: any = await ApiManager("transaction/callback-topay", {

            method: "POST",
            data: body

        });

        return res
    } catch (error) {
        const err: any = error
        throw new Error(err)
    }
}