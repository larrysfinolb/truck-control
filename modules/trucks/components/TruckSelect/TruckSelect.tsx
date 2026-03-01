import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/modules/shared/components/UI/select";
import { Truck } from "../../interfaces/truckResponse";

interface TruckSelectProps {
  value: string;
  onChange: (value: string) => void;
  trucks: Truck[];
  id?: string;
  isInvalid?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function TruckSelect({
  value,
  onChange,
  trucks,
  id,
  isInvalid,
  placeholder = "Select a truck",
}: TruckSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} aria-invalid={isInvalid}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {trucks.map((truck) => (
          <SelectItem key={truck.id} value={truck.id}>
            {truck.licensePlate} - {truck.model}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
