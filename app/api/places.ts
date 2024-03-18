const API_URL = process.env.EXPO_PUBLIC_API_URL;
import axios from "axios";
import { PlaceType } from "@/types/type";
export const getData = async (text: string): Promise<PlaceType[]> => {
  const resp = await axios.get(`${API_URL}/img?query=${text}`);

  return resp.data;
};

export const getDataById = async (id: string): Promise<PlaceType> => {
  const resp = await axios.get(`${API_URL}/img/${id}`);

  return resp.data;
};
