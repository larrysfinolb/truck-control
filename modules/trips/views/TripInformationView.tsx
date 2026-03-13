"use client";

import { usePageTitle } from "@/modules/shared/hooks/usePageTitle";
import { DeliveriesLayout } from "../layouts/DeliveriesLayout";
import { useParams } from "next/navigation";
import { useDelivery } from "../hooks/useDeliveries";
import { TripGeneralInformation, TripPaymentInformation } from "../components/TripInformation/";
import { Expenses } from "../components/Expenses";

interface RouteParams extends Record<string, string | undefined> {
  "trip-id": string;
}

export default function TripInformationView() {
  usePageTitle("Trip Information");

  const params = useParams<RouteParams>();
  const tripId = params["trip-id"];

  const { data } = useDelivery(tripId);
  const trip = data?.data;

  if (!trip) {
    return (
      <DeliveriesLayout>
        <p className='text-center text-gray-500'>Loading trip information...</p>
      </DeliveriesLayout>
    );
  }

  return (
    <DeliveriesLayout>
      <div className='flex flex-col md:flex-row gap-6'>
        <TripGeneralInformation trip={trip} className='flex-3' />
        <TripPaymentInformation trip={trip} className='flex-1' />
      </div>

      <Expenses trip={trip} />
    </DeliveriesLayout>
  );
}
