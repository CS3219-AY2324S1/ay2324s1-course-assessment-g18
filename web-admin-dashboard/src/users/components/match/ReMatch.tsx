import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { DialogClose, DialogContent } from "@radix-ui/react-dialog";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  setRematch: Dispatch<SetStateAction<boolean>>;
  setChosen: Dispatch<SetStateAction<boolean>>;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}
function ReMatch({ setRematch, setChosen, setOpenDialog }: Props) {
  const handleRematch = () => {
    setRematch(false);
    setChosen(false);
  };
  const handleClose = () => {
    setOpenDialog(false);
    handleRematch();
    
    // setRematch(false);
    // setChosen(false);
  };
  return (
    <div className="h-[150px] flex flex-col">
      <DialogTitle className="">No match found...</DialogTitle>
      <DialogContent className="h-full flex flex-col justify-center gap-10">
        <div>Would you like to rematch?</div>
        <div className="flex gap-3 justify-end">
          <Button
            onClick={handleClose}
            className="bg-white border-[#e2e8f0] border-[0.5px] w-[80px] text-black hover:bg-[#f4f4f5]"
          >
            No
          </Button>
          <Button onClick={handleRematch} className="w-[80px]">
            Yes
          </Button>
        </div>
      </DialogContent>
    </div>
  );
}

export default ReMatch;
