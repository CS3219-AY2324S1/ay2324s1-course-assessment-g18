import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";
import MatchDialog from "../../match/MatchDialog";

interface Props {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}
function MatchBtn({ openDialog, setOpenDialog }: Props) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <div className="match-btn">Match</div>
      </DialogTrigger>
      <MatchDialog setOpenDialog={setOpenDialog} openDialog={openDialog} />
    </Dialog>
  );
}

export default MatchBtn;
