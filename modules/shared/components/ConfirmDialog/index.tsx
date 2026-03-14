"use client";

import { ReactNode, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../UI/alert-dialog";
import { Loader2 } from "lucide-react";

interface ConfirmDialogProps {
  children: ReactNode;
  title: string;
  description: string | ReactNode;
  confirmText?: string;
  confirmVariant?: "destructive" | "default";
  cancelText?: string;
  onConfirm: () => Promise<unknown>;
  icon?: ReactNode;
}

export function ConfirmDialog({
  children,
  title,
  description,
  confirmText = "Confirm",
  confirmVariant = "default",
  onConfirm,
  cancelText = "Cancel",
  icon,
}: ConfirmDialogProps) {
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      setIsPending(true);
      await onConfirm();
      setIsOpen(false);
    } catch {
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent size='sm'>
        <AlertDialogHeader>
          {icon && <AlertDialogMedia>{icon}</AlertDialogMedia>}
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel size={"sm"} variant='outline' disabled={isPending}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction size={"sm"} onClick={handleConfirm} variant={confirmVariant} disabled={isPending}>
            {isPending && <Loader2 className='animate-spin' />}
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
