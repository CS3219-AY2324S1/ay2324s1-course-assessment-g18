import React, { ReactNode } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
interface Props {
  dialogTitle: string;
  children: ReactNode;
}
function CustomDialog({ dialogTitle, children }: Props) {
  return (
    <DialogContent
      onInteractOutside={(e) => {
        e.preventDefault();
      }}
    >
      <DialogHeader>
        <DialogTitle>{dialogTitle}</DialogTitle>
        {children}
      </DialogHeader>
    </DialogContent>
  );
}

export default CustomDialog;
