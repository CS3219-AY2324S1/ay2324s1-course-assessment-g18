import CustomDialog from '@/components/dialog/CustomDialog';
import {
  Dialog,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { History, QuestionDifficulty } from '@/users/historyRepo/history.model';
import { useState } from 'react';

interface Props {
  history: History;
}

function HistoryDialog({ history }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">{history.questionTitle}</div>
      </DialogTrigger>
      <CustomDialog dialogTitle={`${history.questionTitle}`}>
        <div
          className={` h-full w-20 rounded-md p-1 text-center ${
            history.questionDifficulty == QuestionDifficulty.Easy
              ? 'bg-green-200 text-green-600'
              : history.questionDifficulty == QuestionDifficulty.Medium
              ? 'bg-yellow-100 text-yellow-600'
              : 'bg-red-200 text-red-600'
          }`}
        >
          {history.questionDifficulty}
        </div>
        <div>
          <DialogTitle>Question Description</DialogTitle>
          <DialogDescription>{history.questionDescription}</DialogDescription>
        </div>
        <div>
          <DialogTitle>Your submission</DialogTitle>
          <DialogDescription>
            <pre>
              <code>{history.codeExecuted}</code>
            </pre>
          </DialogDescription>
        </div>
        <div>
          <DialogTitle>Chat history with partner</DialogTitle>
          <DialogDescription>{history.chatHistory}</DialogDescription>
        </div>
      </CustomDialog>
    </Dialog>
  );
}

export default HistoryDialog;
