"use client";

import { usePageTitle } from "@/modules/shared/hooks/usePageTitle";
import { DeliveriesLayout } from "../layouts/DeliveriesLayout";
import { DeliveryType } from "../enums/deliveryType";
import { useDeliveries } from "../hooks/useDeliveries";
import { DeliveryBasedOnRate } from "../interfaces/deliveryResponse";
import { useState } from "react";
import { CreateTripOnFlatRate } from "../components/Dialogs";
import { TripsOnFlatRateTable } from "../components/Tables";

export default function TripsOnFlatRate() {
  usePageTitle("Trips on Flat Rate");
  const [params, _setParams] = useState({
    page: 1,
    limit: 100,
    type: DeliveryType.FIXED_RATE,
  });

  const { data } = useDeliveries<DeliveryBasedOnRate>(params);

  return (
    <DeliveriesLayout>
      <div className='flex justify-end'>
        <CreateTripOnFlatRate />
      </div>
      <TripsOnFlatRateTable data={data?.data ?? []} />
    </DeliveriesLayout>
  );
}
