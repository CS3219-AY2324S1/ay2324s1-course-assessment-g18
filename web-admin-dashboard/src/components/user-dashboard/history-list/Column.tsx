import { History, QuestionDifficulty } from "@/userHistoryRepo/history.model";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Columns: ColumnDef<History>[] = [
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
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => <div className="citalize">{row.getValue("_id")}</div>,
  },
  {
    accessorKey: "questionTitle",
    header: "Title",
    cell: ({ row }) => (
      <div className="citalize">{row.getValue("questionTitle")}</div>
    ),
  },
  {
    accessorKey: "questionDifficulty",
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
            row.getValue("questionDifficulty") == QuestionDifficulty.Easy
              ? "bg-green-200 text-green-600"
              : row.getValue("questionDifficulty") == QuestionDifficulty.Medium
              ? "bg-yellow-100 text-yellow-600"
              : "bg-red-200 text-red-600"
          }`}
        >
          {row.getValue("questionDifficulty")}
        </div>
      );
    },
  },
  {
    accessorKey: "dateSubmitted",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Submitted On
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="citalize">{row.getValue("dateSubmitted")}</div>;
    },
  },
  {
    accessorKey: "submission",
    header: "Submission",
    cell: ({ row }) => (
      <div className="citalize">{row.getValue("submission")}</div>
    ),
  },
];
