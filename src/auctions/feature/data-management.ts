import { serverAction, ServerActionError } from "@/auctions/action";
import { getToken } from "@/auctions/auth/token";
import { EndpointData } from "@/types/api/api";
import { APIResponse, PaginatedAPIResponse, PaginationParams, User } from "@/types/def";
import axios from "axios";

export const getUsers = serverAction(
  async (params?: PaginationParams) => {
    const token = await getToken();
    
    if (!token) {
      throw new ServerActionError("Token tidak ditemukan. Silakan login kembali.", "401");
    }
    
    const url = `${process.env.NEXT_PUBLIC_API_LOCAL}/${EndpointData}`;
    const config = {
      params: {
        page: params?.page,
        page_size: params?.page_size,
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const res = await axios.get<PaginatedAPIResponse<User>>(url, config);

    const { status, message, data, code } = res.data;

    if (!status) {
      throw new ServerActionError(message, code);
    }

    return data;
  },
  "GET_USERS"
);

export const createData = serverAction(
    async (data: { name: string; email: string; password: string; role_id: number; status: string }) => {
      const token = await getToken();
      const url = `${process.env.NEXT_PUBLIC_API_LOCAL}/${EndpointData}`;
  
      const res = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      const { status, message, code } = res.data;
  
      if (!status) {
        throw new ServerActionError(message, code);
      }
  
      return res.data;
    },
    "CREATE_USER"
  );
  
  export const updateData = serverAction(
    async (data: { id: number; name?: string; email?: string; password?: string; role_id?: number; status?: string }) => {
      const token = await getToken();
      const url = `${process.env.NEXT_PUBLIC_API_LOCAL}/${EndpointData}/?id=${data.id}`;
  
      const res = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      const { status, message, code } = res.data;
  
      if (!status) {
        throw new ServerActionError(message, code);
      }
  
      return res.data;
    },
    "UPDATE_USER"
  );
  

export const deleteData = serverAction(
  async (id: number) => {
    const token = await getToken();
    const url = `${process.env.NEXT_PUBLIC_API_LOCAL}/${EndpointData}/?id=${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.delete<APIResponse<User>>(url, config);

    const { status, message, code } = res.data;

    if (!status) {
      throw new ServerActionError(message, code);
    }

    return res.data;
  },
  "DELETE_USER"
);



