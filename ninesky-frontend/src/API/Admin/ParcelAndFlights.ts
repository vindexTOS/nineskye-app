import { ApiManager } from "../ApiManager";
import Cookies from "universal-cookie";
import { CreateFlightType } from "../../types/flight.type"
import { CreateParcelsType } from "../../types/parcel.type";
const cookies = new Cookies();





export const GetFlights = async (page: number = 1, limit: number = 10, flight_id: string

) => {
  try {

    const token = cookies.get("token");
    const res: any = await ApiManager(`admin/get-flights?page=${page}&limit=${limit}&flight_id=${flight_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },

    });
    return res.data;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};

export const GetSingleFlight = async (page: number = 1, limit: number = 10, flight_id: string

) => {
  try {

    const token = cookies.get("token");
    const res: any = await ApiManager(`admin/get-flights?page=${page}&limit=${limit}&flight_id=${flight_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },

    });
    return res.data;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};






export const CreateFlight = async (body: CreateFlightType) => {
  try {

    const token = cookies.get("token");
    const res: any = await ApiManager(`admin/create-flight`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: body,
    });
    return res;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};




export const CreateParcles = async (body: CreateParcelsType) => {
  try {
    console.log(body)
    const token = cookies.get("token");
    const res: any = await ApiManager(`admin/create-parcels`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: body,
    });
    return res;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};

export const UpdateParcels = async (body: any) => {
  const id = body.tracking_id
  delete body.declaration;
  delete body.tracking_id
  try {
    const token = cookies.get("token");
    const res: any = await ApiManager(`admin/update-parcel/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: body,
    });
    return res;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }

}

export const GetParcels = async (searchTerm: string, ownerId: string, page: number, limit: number) => {
  try {
    const token = cookies.get("token");
    const res: any = await ApiManager(`admin/get-parcels?tracking_id=${searchTerm}&ownerId=${ownerId}&page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};