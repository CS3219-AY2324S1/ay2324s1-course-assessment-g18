import React, { ReactNode } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
interface Props {
  dialogTitle: string;
  children: ReactNode;
}
function CustomDialog({ dialogTitle, children }: Props) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogDescription>{children}</DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}

export default CustomDialog;
