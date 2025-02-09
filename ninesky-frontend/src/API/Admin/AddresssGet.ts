import { ApiManager } from "../ApiManager";



export const getAddress = async (

) => {
    try {


        const res: any = await ApiManager.get(`/app/addresses` );

        return res.data;
    } catch (error) {
        console.error("Error fetching payment history:", error);
        const err: any = error
        throw new Error(err.message);
    }
};

