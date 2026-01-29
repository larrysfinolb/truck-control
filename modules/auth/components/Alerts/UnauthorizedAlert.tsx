import { Alert, AlertDescription, AlertTitle } from "@/modules/shared/components/UI/alert";
import { AlertCircle } from "lucide-react";

interface UnauthorizedAlertProps {
  title: string;
  description: string;
}

export function UnauthorizedAlert({ title, description }: UnauthorizedAlertProps) {
  return (
    <Alert variant='destructive' className='animate-in fade-in duration-300 border-red-600'>
      <AlertCircle className='h-4 w-4' />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
