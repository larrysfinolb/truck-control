export interface Delivery {
  id: string;
  vehicle: string;
  driver: string;
  date: Date;
  origin: string;
  destination: string;
}

export interface DeliveryBasedOnRate extends Delivery {
  rate: number;
  carrierFee: number;
}

export interface DeliveryBasedOnMileage extends Delivery {
  miles: number;
  ratePerMile: number;
  milesDeadhead: number;
  ratePerMileDeadhead: number;
}
