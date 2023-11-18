import { Checkbox } from "@/components/ui/checkbox";
import { Question, QuestionDifficulty } from "@/questionrepo/question.model";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuestionDialog from "./question-card/QuestionDialog";

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
    accessorKey: "questionId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize pl-7">{row.getValue("questionId")}</div>
    ),
  },
  {
    accessorKey: "questionTitle",
    header: "Title",
    cell: ({ row }) => <QuestionDialog question={row.original} />,
  },
  {
    accessorKey: "questionCategories",
    header: "Category",
    cell: ({ row }) => {
      const values: string[] = row.getValue("questionCategories");
      const combinedString = values.join(", ");
      return <div>{combinedString}</div>;
    },
  },
  {
    accessorKey: "questionDifficulty",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Difficulty
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div
        className={`h-full w-20 rounded-md p-1 text-center ${
          row.original["questionDifficulty"] === QuestionDifficulty.Easy
            ? "bg-green-200 text-green-600"
            : row.original["questionDifficulty"] === QuestionDifficulty.Medium
            ? "bg-yellow-100 text-yellow-600"
            : "bg-red-200 text-red-600"
        }`}
      >
        {row.original["questionDifficulty"]}
      </div>
    ),
    sortingFn: (rowA, rowB, columnId) => {
      const difficultyOrder = {
        [QuestionDifficulty.Easy]: 0,
        [QuestionDifficulty.Medium]: 1,
        [QuestionDifficulty.Hard]: 2,
      };

      const difficultyA: QuestionDifficulty = (rowA.original as any)[columnId];
      const difficultyB: QuestionDifficulty = (rowB.original as any)[columnId];

      return difficultyOrder[difficultyA] - difficultyOrder[difficultyB];
    },
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const question = row.original;

  //     return <ActionsDropdown question={question} />;
  //   },
  // },
];
