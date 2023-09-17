import { Checkbox } from "@/components/ui/checkbox";
import { Question, QuestionDifficulty } from "@/questionrepo/question.model";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ActionsDropdown from "./actions-dropdown/ActionsDropdown";

export const Columns: ColumnDef<Question>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "qId",
    header: "ID",
    cell: ({ row }) => <div className="citalize">{row.getValue("qId")}</div>,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div className="citalize">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "complexity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Difficulty
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div
          className={` h-full w-20 rounded-md p-1 text-center ${
            row.getValue("complexity") == QuestionDifficulty.Easy
              ? "bg-green-200 text-green-600"
              : row.getValue("complexity") == QuestionDifficulty.Medium
              ? "bg-yellow-100 text-yellow-600"
              : "bg-red-200 text-red-600"
          }`}
        >
          {row.getValue("complexity")}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const question = row.original;

      return <ActionsDropdown question={question} />;
    },
  },
];
