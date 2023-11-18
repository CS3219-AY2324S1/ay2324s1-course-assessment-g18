import { Dispatch, SetStateAction } from "react";
import EndDialog from "../../end/EndDialog";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Props {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}
function EndBtn({ openDialog, setOpenDialog }: Props) {
  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger>
        <div className="end-btn hover:bg-primary/90">End</div>
      </AlertDialogTrigger>
      <EndDialog />
    </AlertDialog>
  );
}

export default EndBtn;
