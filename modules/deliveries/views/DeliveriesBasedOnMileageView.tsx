"use client";

import { usePageTitle } from "@/modules/shared/hooks/usePageTitle";
import { CreateBasedOnMileageDialog } from "../components/Dialogs";
import { DeliveriesBasedOnMileageTable } from "../components/Tables";
import { DeliveriesLayout } from "../layouts/DeliveriesLayout";
import { useState } from "react";
import { useDeliveries } from "../hooks/useDeliveries";
import { DeliveryType } from "../enums/deliveryType";
import { DeliveryBasedOnMileage } from "../interfaces/deliveryResponse";

export default function DeliveriesBasedOnMileageView() {
  usePageTitle("Deliveries Based on Mileage");
  const [params, _setParams] = useState({
    page: 1,
    limit: 100,
    type: DeliveryType.MILEAGE_BASED,
  });

  const { data } = useDeliveries<DeliveryBasedOnMileage>(params);

  return (
    <DeliveriesLayout>
      <div className='flex justify-end'>
        <CreateBasedOnMileageDialog />
      </div>
      <DeliveriesBasedOnMileageTable data={data?.data ?? []} />
    </DeliveriesLayout>
  );
}
