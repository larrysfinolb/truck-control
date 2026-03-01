import { PaginationParams } from "@/modules/shared/interfaces/queryParams";
import { DeliveryType } from "../enums/deliveryType";

export interface DeliveriesListParams extends PaginationParams {
  type?: DeliveryType;
}
