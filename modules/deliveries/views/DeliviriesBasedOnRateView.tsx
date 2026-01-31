"use client";

import { usePageTitle } from "@/modules/shared/hooks/usePageTitle";
import { CreateBasedOnRateDialog } from "../components/Dialogs";
import { DeliveriesBasedOnRateTable } from "../components/Tables";
import { DeliveriesLayout } from "../layouts/DeliveriesLayout";
import { DeliveryType } from "../enums/deliveryType";
import { useDeliveries } from "../hooks/useDeliveries";
import { DeliveryBasedOnRate } from "../interfaces/deliveryResponse";
import { useState } from "react";

export default function DeliveriesBasedOnRateView() {
  usePageTitle("Deliveries Based on Rate");
  const [params, _setParams] = useState({
    page: 1,
    limit: 100,
    type: DeliveryType.FIXED_RATE,
  });

  const { data } = useDeliveries<DeliveryBasedOnRate>(params);

  return (
    <DeliveriesLayout>
      <div className='flex justify-end'>
        <CreateBasedOnRateDialog />
      </div>
      <DeliveriesBasedOnRateTable data={data?.data ?? []} />
    </DeliveriesLayout>
  );
}
