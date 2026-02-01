import { Alert, AlertDescription, AlertTitle } from "@/modules/shared/components/UI/alert";
import { AlertCircle } from "lucide-react";

interface AppAlertProps {
  title: string;
  description: string;
  variant?: "default" | "destructive";
}

export function AppAlert({ title, description, variant = "default" }: AppAlertProps) {
  return (
    <Alert variant={variant} className='animate-in fade-in duration-300 border-red-600'>
      {/* TODO: Se debe cambiar el icono para los default variants */}
      {variant === "destructive" ? <AlertCircle className='h-4 w-4' /> : <AlertCircle className='h-4 w-4' />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
