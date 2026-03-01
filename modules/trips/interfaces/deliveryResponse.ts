import { DeleteResponse, GetAllResponse, SingleEntityResponse } from "@/modules/shared/interfaces/apiResponse";
import { DeliveryType } from "../enums/deliveryType";

export interface Delivery {
  id: string;
  userId: string;
  type: DeliveryType;
  vehicle: string;
  driver: string;
  origin: string;
  destination: string;
  pickupDate: Date;
  rate?: number;
  carrierFee?: number;
  miles?: number;
  ratePerMile?: number;
  deadheadMiles?: number;
  ratePerDeadheadMile?: number;
  totalPayment?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface DeliveryBasedOnRate extends Omit<
  Delivery,
  "miles" | "ratePerMile" | "deadheadMiles" | "ratePerDeadheadMile"
> {
  type: DeliveryType.FIXED_RATE;
  rate: number;
  carrierFee: number;
}

export interface DeliveryBasedOnMileage extends Omit<Delivery, "rate" | "carrierFee"> {
  type: DeliveryType.MILEAGE_BASED;
  miles: number;
  ratePerMile: number;
  deadheadMiles: number;
  ratePerDeadheadMile: number;
  totalPayment: number;
}

export type DeliveriesListResponse = GetAllResponse<Delivery>;

export type DeliveryResponse = SingleEntityResponse<Delivery>;

export type CreateDeliveryResponse = SingleEntityResponse<Delivery>;

export type UpdateDeliveryResponse = SingleEntityResponse<Delivery>;

export type DeleteDeliveryResponse = DeleteResponse;

export interface DeliveryByRate extends Omit<
  Delivery,
  "miles" | "ratePerMile" | "deadheadMiles" | "ratePerDeadheadMile"
> {
  type: DeliveryType.FIXED_RATE;
  rate: number;
  carrierFee: number;
}
