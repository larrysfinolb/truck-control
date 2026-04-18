"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/modules/shared/components/UI/tabs";
import { usePageTitle } from "@/modules/shared/hooks/usePageTitle";
import { ChangeEvent, useState } from "react";
import { useDebounce } from "use-debounce";
import { TripsToolbar } from "../components/TripsToolbar";
import { TripsOnFlatRateTable, TripsPerMileTable } from "../components/Tables";
import { TripType } from "../enums/tripTypes";
import { useDeliveries } from "../hooks/useTrips";
import { DeliveriesLayout } from "../layouts/DeliveriesLayout";

interface TripsViewProps {
  initialType?: TripType;
}

export default function TripsView({ initialType = TripType.FIXED_RATE }: TripsViewProps) {
  usePageTitle("Trips");

  const [activeType, setActiveType] = useState(initialType);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const { data } = useDeliveries({
    page: 1,
    limit: 100,
    type: activeType,
    search: debouncedSearch,
  });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeChange = (type: TripType) => {
    setActiveType(type);
  };

  return (
    <DeliveriesLayout>
      <TripsToolbar activeType={activeType} searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <Tabs value={activeType} onValueChange={(value) => handleTypeChange(value as TripType)}>
        <TabsList>
          <TabsTrigger value={TripType.FIXED_RATE}>Fixed Rate</TabsTrigger>
          <TabsTrigger value={TripType.PER_MILE}>Per Mile</TabsTrigger>
        </TabsList>

        <TabsContent value={TripType.FIXED_RATE}>
          <TripsOnFlatRateTable data={data?.data ?? []} />
        </TabsContent>

        <TabsContent value={TripType.PER_MILE}>
          <TripsPerMileTable data={data?.data ?? []} />
        </TabsContent>
      </Tabs>
    </DeliveriesLayout>
  );
}
