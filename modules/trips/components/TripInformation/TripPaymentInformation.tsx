import { cn } from "@/lib/utils";
import { Delivery } from "../../interfaces/trip";
import { DataField } from "./DataField";
import { formatCurrency, formatPercent } from "@/modules/shared/utils/formatters";

interface TripPaymentInformationProps {
  trip?: Delivery;
  className?: string;
}

export function TripPaymentInformation({ trip, className }: TripPaymentInformationProps) {
  if (!trip) {
    return (
      <section className={cn("rounded-xl border bg-card p-6 text-card-foreground shadow-sm", className)}>
        <p className='text-sm text-muted-foreground text-center'>No payment information available.</p>
      </section>
    );
  }

  const receiptRowClass =
    "flex-row justify-between items-center space-y-0 pb-3 pt-3 first:pt-0 last:border-0 last:pb-0";

  return (
    <section
      aria-labelledby='trip-payment-title'
      className={cn("rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden", className)}
    >
      <header className='flex flex-col space-y-1.5 p-6 pb-4 border-b border-border/50 bg-muted/10'>
        <h2 id='trip-payment-title' className='text-lg font-semibold leading-none tracking-tight'>
          Payment Information
        </h2>
      </header>

      <div className='p-6'>
        <dl className='flex flex-col'>
          <DataField className={receiptRowClass} label='Rate' value={formatCurrency(trip.rate)} />
          <DataField className={receiptRowClass} label='Carrier Fee' value={formatPercent(trip.carrierFee)} />

          <div className='mt-2 pt-4 border-t-2 border-border/80'>
            <DataField
              label='Total Payment'
              value={formatCurrency(trip.totalPayment)}
              className='flex-row justify-between items-center space-y-0  [&>dd]:font-bold'
            />
          </div>
        </dl>
      </div>
    </section>
  );
}
