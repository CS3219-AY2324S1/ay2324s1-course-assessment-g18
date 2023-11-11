import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EndHistorySessionDialog() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [openDialog, setOpenDialog] = useState(false);

  function handleEnd() {
    navigate('/user-dashboard');
    console.log('leaving history session');
    toast({
      title: 'History session ended!',
      description:
        'Congratulations, you have successfully completed a history session.',
    });
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>End History Session</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to end your history session?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => setOpenDialog(false)}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction onClick={handleEnd}>Confirm</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

export default EndHistorySessionDialog;
