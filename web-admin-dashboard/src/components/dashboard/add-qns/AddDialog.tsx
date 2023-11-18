import CustomDialog from "@/components/dialog/CustomDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useState, Dispatch, SetStateAction } from "react";
import AddQuestionForm from "./AddQuestionForm";

interface Props {
  setIsChanged: Dispatch<SetStateAction<boolean>>;
}
function AddDialog({ setIsChanged }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-transparent" variant="link">
          <PlusCircle color="grey" />
        </Button>
      </DialogTrigger>
      <CustomDialog dialogTitle="Add a New Question">
        <AddQuestionForm setOpen={setOpen} setIsChanged={setIsChanged} />
      </CustomDialog>
    </Dialog>
  );
}

export default AddDialog;
