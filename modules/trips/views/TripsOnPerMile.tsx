"use client";

import { usePageTitle } from "@/modules/shared/hooks/usePageTitle";
import { DeliveriesLayout } from "../layouts/DeliveriesLayout";
import { useState } from "react";
import { useDeliveries } from "../hooks/useDeliveries";
import { DeliveryType } from "../enums/deliveryType";
import { DeliveryBasedOnMileage } from "../interfaces/deliveryResponse";
import { CreateTripPerMile } from "../components/Dialogs";
import { TripsPerMileTable } from "../components/Tables";

export default function TripsOnPerMile() {
  usePageTitle("Trips on Per Mile");
  const [params, _setParams] = useState({
    page: 1,
    limit: 100,
    type: DeliveryType.MILEAGE_BASED,
  });

  const { data } = useDeliveries<DeliveryBasedOnMileage>(params);

  return (
    <DeliveriesLayout>
      <div className='flex justify-end'>
        <CreateTripPerMile />
      </div>
      <TripsPerMileTable data={data?.data ?? []} />
    </DeliveriesLayout>
  );
}
