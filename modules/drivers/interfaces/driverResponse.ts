import { DeleteResponse, GetAllResponse, SingleEntityResponse } from "@/modules/shared/interfaces/apiResponse";

export interface Driver {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type DriversListResponse = GetAllResponse<Driver>;

export type DriverResponse = SingleEntityResponse<Driver>;

export type CreateDriverResponse = SingleEntityResponse<Driver>;

export type UpdateDriverResponse = SingleEntityResponse<Driver>;

export type DeleteDriverResponse = DeleteResponse;
