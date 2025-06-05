"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ErrorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
}

export function ErrorDialog({
  isOpen,
  onClose,
  errorMessage,
}: ErrorDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-600">Error</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-700">{errorMessage}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
