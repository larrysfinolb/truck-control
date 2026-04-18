import { api } from "@/lib/axios";
import {
  CreateTripResponse,
  DeleteTripResponse,
  TripsListParams,
  TripsListResponse,
  TripResponse,
  UpdateTripResponse,
} from "../interfaces/trip";
import { CreateTripSchemaType, TripIdSchemaType, UpdateTripSchemaType } from "../schemas/trip";

export const tripsApi = {
  getAll: async (params: TripsListParams) => {
    const response = await api.get<TripsListResponse>("/trips", { params });
    return response.data;
  },
  getOne: async (id: string) => {
    const response = await api.get<TripResponse>(`/trips/${id}`);
    return response.data;
  },
  create: async (payload: CreateTripSchemaType) => {
    const response = await api.post<CreateTripResponse>("/trips", payload);
    return response.data;
  },
  update: async (id: string, payload: UpdateTripSchemaType) => {
    const response = await api.patch<UpdateTripResponse>(`/trips/${id}`, payload);
    return response.data;
  },
  delete: async (id: TripIdSchemaType) => {
    const response = await api.delete<DeleteTripResponse>(`/trips/${id}`);
    return response.data;
  },
};
