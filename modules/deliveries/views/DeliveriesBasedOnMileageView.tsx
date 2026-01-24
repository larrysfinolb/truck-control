"use client";

import { usePageTitle } from "@/modules/shared/hooks/usePageTitle";
import { CreateBasedOnMileageDialog } from "../components/Dialogs";
import { DeliveriesBasedOnMileageTable } from "../components/Tables";
import { DeliveryBasedOnMileage } from "../interfaces/delivery";
import { DeliveriesLayout } from "../layouts/DeliveriesLayout";

const DUMMY_DELIVERIES: DeliveryBasedOnMileage[] = [
  {
    id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
    date: new Date("2026-01-15"),
    vehicle: "Truck 12",
    driver: "John Doe",
    origin: "New York, NY",
    destination: "Los Angeles, CA",
    miles: 2800,
    ratePerMile: 0.54,
    milesDeadhead: 150,
    ratePerMileDeadhead: 0.3,
  },
  {
    id: "0p9o8n7m-6l5k-4j3i-2h1g-f0e9d8c7b6a5",
    date: new Date("2026-02-20"),
    vehicle: "Truck 7",
    driver: "Jane Smith",
    origin: "Chicago, IL",
    destination: "Houston, TX",
    miles: 1090,
    ratePerMile: 0.55,
    milesDeadhead: 100,
    ratePerMileDeadhead: 0.32,
  },
  {
    id: "5f4e3d2c-1b0a-9z8y-7x6w-v5u4t3s2r1q0",
    date: new Date("2026-03-10"),
    vehicle: "Truck 3",
    driver: "Mike Johnson",
    origin: "Miami, FL",
    destination: "Seattle, WA",
    miles: 3300,
    ratePerMile: 0.52,
    milesDeadhead: 200,
    ratePerMileDeadhead: 0.28,
  },
  {
    id: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    date: new Date("2026-04-05"),
    vehicle: "Truck 8",
    driver: "Emily Davis",
    origin: "Boston, MA",
    destination: "San Francisco, CA",
    miles: 2900,
    ratePerMile: 0.53,
    milesDeadhead: 180,
    ratePerMileDeadhead: 0.29,
  },
];

export default function DeliveriesBasedOnMileageView() {
  usePageTitle("Deliveries Based on Mileage");

  return (
    <DeliveriesLayout>
      <div className='flex justify-end'>
        <CreateBasedOnMileageDialog />
      </div>
      <DeliveriesBasedOnMileageTable data={DUMMY_DELIVERIES} />
    </DeliveriesLayout>
  );
}
