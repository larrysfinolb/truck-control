import { DeleteResponse, GetAllResponse, SingleEntityResponse } from "@/modules/shared/interfaces/apiResponse";

export interface Truck {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  vin: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type TrucksListResponse = GetAllResponse<Truck>;

export type TruckResponse = SingleEntityResponse<Truck>;

export type CreateTruckResponse = SingleEntityResponse<Truck>;

export type UpdateTruckResponse = SingleEntityResponse<Truck>;

export type DeleteTruckResponse = DeleteResponse;
