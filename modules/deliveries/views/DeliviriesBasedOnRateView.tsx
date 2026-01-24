"use client";

import { usePageTitle } from "@/modules/shared/hooks/usePageTitle";
import { CreateBasedOnRateDialog } from "../components/Dialogs";
import { DeliveriesBasedOnRateTable } from "../components/Tables";
import { DeliveryBasedOnRate } from "../interfaces/delivery";
import { DeliveriesLayout } from "../layouts/DeliveriesLayout";

const DUMMY_DELIVERIES: DeliveryBasedOnRate[] = [
  {
    id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
    date: new Date("2026-01-15"),
    vehicle: "Truck 12",
    driver: "John Doe",
    origin: "New York, NY",
    destination: "Los Angeles, CA",
    rate: 1500,
    carrierFee: 0.3,
  },
  {
    id: "0p9o8n7m-6l5k-4j3i-2h1g-f0e9d8c7b6a5",
    date: new Date("2026-02-20"),
    vehicle: "Truck 7",
    driver: "Jane Smith",
    origin: "Chicago, IL",
    destination: "Houston, TX",
    rate: 1200,
    carrierFee: 0.25,
  },
  {
    id: "5f4e3d2c-1b0a-9z8y-7x6w-v5u4t3s2r1q0",
    date: new Date("2026-03-10"),
    vehicle: "Truck 3",
    driver: "Mike Johnson",
    origin: "Miami, FL",
    destination: "Seattle, WA",
    rate: 1800,
    carrierFee: 0.28,
  },
  {
    id: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    date: new Date("2026-04-05"),
    vehicle: "Truck 8",
    driver: "Emily Davis",
    origin: "Boston, MA",
    destination: "San Francisco, CA",
    rate: 1600,
    carrierFee: 0.35,
  },
];

export default function DeliveriesBasedOnRateView() {
  usePageTitle("Deliveries Based on Rate");

  return (
    <DeliveriesLayout>
      <div className='flex justify-end'>
        <CreateBasedOnRateDialog />
      </div>
      <DeliveriesBasedOnRateTable data={DUMMY_DELIVERIES} />
    </DeliveriesLayout>
  );
}
