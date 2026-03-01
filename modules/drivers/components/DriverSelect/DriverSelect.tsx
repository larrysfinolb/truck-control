import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/modules/shared/components/UI/select";
import { Driver } from "../../interfaces/driverResponse";

interface DriverSelectProps {
  value: string;
  onChange: (value: string) => void;
  drivers: Driver[];
  id?: string;
  isInvalid?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function DriverSelect({
  value,
  onChange,
  drivers,
  id,
  isInvalid,
  placeholder = "Select a driver",
}: DriverSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} aria-invalid={isInvalid}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {drivers.map((driver) => (
          <SelectItem key={driver.id} value={driver.id}>
            {driver.firstName} {driver.lastName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
