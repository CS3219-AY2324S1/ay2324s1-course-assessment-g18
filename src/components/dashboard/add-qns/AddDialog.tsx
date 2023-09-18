import CustomDialog from "@/components/dialog/CustomDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import AddQuestionForm from "./AddQuestionForm";

function AddDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-transparent" variant="link">
          <PlusCircle color="grey" />
        </Button>
      </DialogTrigger>
      <CustomDialog dialogTitle="Add a New Question">
        <AddQuestionForm setOpen={setOpen} />
      </CustomDialog>
    </Dialog>
  );
}

export default AddDialog;
