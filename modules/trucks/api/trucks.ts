import { api } from "@/lib/axios";
import { TrucksListParams } from "../interfaces/truckParams";
import {
  CreateTruckResponse,
  DeleteTruckResponse,
  TruckResponse,
  TrucksListResponse,
  UpdateTruckResponse,
} from "../interfaces/truckResponse";
import { CreateTruckSchemaType, TruckIdSchemaType, UpdateTruckSchemaType } from "../schemas/truck";

export const trucksApi = {
  getAll: async (params: TrucksListParams) => {
    const response = await api.get<TrucksListResponse>("/trucks", { params });
    return response.data;
  },
  getOne: async (id: TruckIdSchemaType) => {
    const response = await api.get<TruckResponse>(`/trucks/${id}`);
    return response.data;
  },
  create: async (payload: CreateTruckSchemaType) => {
    const response = await api.post<CreateTruckResponse>("/trucks", payload);
    return response.data;
  },
  update: async (id: TruckIdSchemaType, payload: UpdateTruckSchemaType) => {
    const response = await api.patch<UpdateTruckResponse>(`/trucks/${id}`, payload);
    return response.data;
  },
  delete: async (id: TruckIdSchemaType) => {
    const response = await api.delete<DeleteTruckResponse>(`/trucks/${id}`);
    return response.data;
  },
};
