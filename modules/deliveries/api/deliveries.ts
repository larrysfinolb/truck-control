import { api } from "@/lib/axios";
import {
  CreateDeliveryResponse,
  DeleteDeliveryResponse,
  DeliveriesListResponse,
  DeliveryResponse,
  UpdateDeliveryResponse,
} from "../interfaces/deliveryResponse";
import { CreateDeliverySchemaType, DeliveryIdSchemaType, UpdateDeliverySchemaType } from "../schemas/delivery";
import { DeliveriesListParams } from "../interfaces/deliveryParams";

export const deliveriesApi = {
  getAll: async (params: DeliveriesListParams) => {
    const response = await api.get<DeliveriesListResponse>("/deliveries", { params });
    return response.data;
  },
  getOne: async (id: string) => {
    const response = await api.get<DeliveryResponse>(`/deliveries/${id}`);
    return response.data;
  },
  create: async (payload: CreateDeliverySchemaType) => {
    const response = await api.post<CreateDeliveryResponse>("/deliveries", payload);
    return response.data;
  },
  update: async (id: string, payload: UpdateDeliverySchemaType) => {
    const response = await api.patch<UpdateDeliveryResponse>(`/deliveries/${id}`, payload);
    return response.data;
  },
  delete: async (id: DeliveryIdSchemaType) => {
    const response = await api.delete<DeleteDeliveryResponse>(`/deliveries/${id}`);
    return response.data;
  },
};
