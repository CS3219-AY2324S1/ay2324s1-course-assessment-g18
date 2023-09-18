import CustomDialog from "@/components/dialog/CustomDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import UpdateDialog from "./UpdateDialog";
import { Question } from "@/backend/dist/questions/question.schema";
import DeleteDialog from "./DeleteDialog";

interface Props {
  question: Question;
}
function ActionsDropdown({ question }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <UpdateDialog question={question} />
        <DropdownMenuSeparator />
        <DeleteDialog />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActionsDropdown;
