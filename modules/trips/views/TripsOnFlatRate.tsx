"use client";

import { usePageTitle } from "@/modules/shared/hooks/usePageTitle";
import { DeliveriesLayout } from "../layouts/DeliveriesLayout";
import { DeliveryType } from "../enums/deliveryType";
import { useDeliveries } from "../hooks/useDeliveries";
import { DeliveryBasedOnRate } from "../interfaces/deliveryResponse";
import { useState } from "react";
import { CreateTripOnFlatRate } from "../components/Dialogs";
import { TripsOnFlatRateTable } from "../components/Tables";
import { SearchInput } from "@/modules/shared/components/SearchInput";
import { useDebounce } from "use-debounce";

export default function TripsOnFlatRate() {
  usePageTitle("Trips");

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const [params, _setParams] = useState({
    page: 1,
    limit: 100,
    type: DeliveryType.FIXED_RATE,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    if (params.page !== 1) {
      _setParams((prev) => ({ ...prev, page: 1 }));
    }
  };

  const { data } = useDeliveries<DeliveryBasedOnRate>({
    ...params,
    search: debouncedSearch,
  });

  return (
    <DeliveriesLayout>
      <div className='flex items-center justify-between gap-4'>
        <SearchInput
          className='max-w-6xl'
          placeholder='Search for a trip by...'
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <CreateTripOnFlatRate />
      </div>
      <TripsOnFlatRateTable data={data?.data ?? []} />
    </DeliveriesLayout>
  );
}
