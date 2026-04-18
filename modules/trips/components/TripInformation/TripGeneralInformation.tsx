import { cn } from "@/lib/utils";
import { Delivery } from "../../interfaces/trip";
import { DataField } from "./DataField";

interface TripGeneralInformationProps {
  trip?: Delivery;
  className?: string;
}

export function TripGeneralInformation({ trip, className }: TripGeneralInformationProps) {
  if (!trip) {
    return (
      <section className={cn("rounded-xl border bg-card p-6 text-card-foreground shadow-sm", className)}>
        <p className='text-sm text-muted-foreground text-center'>No trip information available.</p>
      </section>
    );
  }

  const driverName = `${trip.driver.firstName} ${trip.driver.lastName}`;
  const truckInfo = `${trip.vehicle.make} ${trip.vehicle.model} - ${trip.vehicle.licensePlate}`;

  return (
    <section
      aria-label='Trip Information Details'
      className={cn("rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden", className)}
    >
      <header className='flex flex-col space-y-1.5 p-6 pb-4 border-b border-border/50 bg-muted/10'>
        <h2 id='trip-general-title' className='text-lg font-semibold leading-none tracking-tight'>
          General Information
        </h2>
      </header>
      <div className='p-6'>
        <dl className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='space-y-6'>
            <DataField label='Origin' value={trip.origin} fallback='No origin specified' />
            <DataField label='Destination' value={trip.destination} fallback='No destination specified' />
          </div>

          <div className='space-y-6'>
            <DataField label='Driver' value={driverName} fallback='No driver assigned' />
            <DataField label='Truck' value={truckInfo} fallback='No truck assigned' />
          </div>
        </dl>
      </div>
    </section>
  );
}
