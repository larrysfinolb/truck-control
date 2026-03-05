"use client";

import { usePageTitle } from "@/modules/shared/hooks/usePageTitle";
import { DeliveriesLayout } from "../layouts/DeliveriesLayout";
import { useParams } from "next/navigation";
import { useDelivery } from "../hooks/useDeliveries";
import { TripGeneralInformation, TripPaymentInformation } from "../components/TripInformation/";

interface RouteParams extends Record<string, string | undefined> {
  "trip-id": string;
}

export default function TripInformationView() {
  usePageTitle("Trip Information");

  const params = useParams<RouteParams>();
  const tripId = params["trip-id"];

  const { data } = useDelivery(tripId);
  const trip = data?.data;

  return (
    <DeliveriesLayout>
      <div className='flex flex-col md:flex-row gap-6'>
        <TripGeneralInformation trip={trip} className='flex-3' />
        <TripPaymentInformation trip={trip} className='flex-1' />
      </div>
    </DeliveriesLayout>
  );
}
