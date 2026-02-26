import { api } from "@/lib/axios";
import { DriversListParams } from "../interfaces/driverParams";
import { Driver, DriversListResponse } from "../interfaces/driverResponse";
import { CreateDriverSchemaType, DriverIdSchemaType, UpdateDriverSchemaType } from "../schemas/driver";

export const driversApi = {
  getAll: async (params: DriversListParams) => {
    const response = await api.get<DriversListResponse>("/drivers", { params });
    return response.data;
  },
  getOne: async (id: DriverIdSchemaType) => {
    const response = await api.get<Driver>(`/drivers/${id}`);
    return response.data;
  },
  create: async (payload: CreateDriverSchemaType) => {
    const response = await api.post<CreateDriverSchemaType>("/drivers", payload);
    return response.data;
  },
  update: async (id: DriverIdSchemaType, payload: UpdateDriverSchemaType) => {
    const response = await api.patch<UpdateDriverSchemaType>(`/drivers/${id}`, payload);
    return response.data;
  },
  delete: async (id: DriverIdSchemaType) => {
    const response = await api.delete<DriverIdSchemaType>(`/drivers/${id}`);
    return response.data;
  },
};
