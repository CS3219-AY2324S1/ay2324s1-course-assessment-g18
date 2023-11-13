import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dispatch, SetStateAction } from 'react';
import EndHistorySessionDialog from '../../end/EndHistorySessionDialog';

interface Props {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}

function EndHistorySessionBtn({ openDialog, setOpenDialog }: Props) {
  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger>
        <div className="end-btn hover:bg-primary/90">End</div>
      </AlertDialogTrigger>
      <EndHistorySessionDialog />
    </AlertDialog>
  );
}

export default EndHistorySessionBtn;
