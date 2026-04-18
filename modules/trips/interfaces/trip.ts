import { DeleteResponse, GetAllResponse, SingleEntityResponse } from "@/modules/shared/interfaces/apiResponse";
import { PaginationParams } from "@/modules/shared/interfaces/queryParams";
import { Driver } from "@/modules/drivers/interfaces/driverResponse";
import { Truck } from "@/modules/trucks/interfaces/truckResponse";
import { TripType } from "../enums/tripTypes";
import { Expense } from "./expenseResponse";

// Replaces a subset of properties from a base type while preserving the rest.
type Override<TBase, TOverrides> = Omit<TBase, keyof TOverrides> & TOverrides;

// Canonical trip shape returned by the API before narrowing by billing model.
// This is the single source of truth for trip-related types in the module.
export interface TripBase {
  id: string;
  userId: string;
  type: TripType;
  vehicleId: string;
  driverId: string;
  origin: string;
  destination: string;
  pickupDate: string;
  totalPayment: number;
  rate: number | null;
  carrierFee: number | null;
  miles: number | null;
  ratePerMile: number | null;
  deadheadMiles: number | null;
  ratePerDeadheadMile: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  vehicle: Truck;
  driver: Driver;
  expenses: Expense[];
}

// Fixed-rate trip: mileage-specific fields are intentionally null.
export type FixedRateTrip = Override<
  TripBase,
  {
    type: TripType.FIXED_RATE;
    rate: number;
    carrierFee: number;
    miles: null;
    ratePerMile: null;
    deadheadMiles: null;
    ratePerDeadheadMile: null;
  }
>;

// Per-mile trip: flat-rate fields are intentionally null.
export type PerMileTrip = Override<
  TripBase,
  {
    type: TripType.PER_MILE;
    rate: null;
    carrierFee: null;
    miles: number;
    ratePerMile: number;
    deadheadMiles: number;
    ratePerDeadheadMile: number;
  }
>;

// Canonical trip entity used by the module.
export type Trip = FixedRateTrip | PerMileTrip;

// Form state allows incomplete values while the user is still filling the dialog.
export type TripFormValues = Override<
  Pick<
    TripBase,
    | "type"
    | "vehicleId"
    | "driverId"
    | "origin"
    | "destination"
    | "pickupDate"
    | "rate"
    | "carrierFee"
    | "miles"
    | "ratePerMile"
    | "deadheadMiles"
    | "ratePerDeadheadMile"
  >,
  {
    vehicleId: string | null;
    driverId: string | null;
    origin: string | null;
    destination: string | null;
    pickupDate: string | null;
  }
>;

// Query params used by trip list endpoints.
export interface TripsListParams extends PaginationParams {
  type?: TripType;
  search?: string;
}

// API envelopes returned by trip endpoints.
export type TripsListResponse = GetAllResponse<Trip>;
export type TripResponse = SingleEntityResponse<Trip>;
export type CreateTripResponse = SingleEntityResponse<Trip>;
export type UpdateTripResponse = SingleEntityResponse<Trip>;
export type DeleteTripResponse = DeleteResponse;
