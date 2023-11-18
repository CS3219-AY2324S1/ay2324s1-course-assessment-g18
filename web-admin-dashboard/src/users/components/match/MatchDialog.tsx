import { useEffect, useState } from 'react';
import './MatchDialog.css';
import CustomDialog from '@/components/dialog/CustomDialog';
import ChooseMatch from './ChooseMatch';
import WaitingMatch from './WaitingMatch';
import ReMatch from './ReMatch';
interface Props {
  openDialog: boolean;
}
function MatchDialog({ openDialog }: Props) {
  // hard code the preferences selected for now
  const [chosen, setchosen] = useState(false);
  const [rematch, setRematch] = useState(false);

  useEffect(() => {
    if (!openDialog) {
      setchosen(false);
      setRematch(false);
    }
  }, [openDialog]);
  return (
    <CustomDialog dialogTitle="">
      {rematch ? <ReMatch /> : !chosen ? <ChooseMatch /> : <WaitingMatch />}
    </CustomDialog>
  );
}

export default MatchDialog;
