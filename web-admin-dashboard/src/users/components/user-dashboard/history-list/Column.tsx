import { History, QuestionDifficulty } from '@/users/historyRepo/history.model';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HistoryDialog from './history-card/HistoryDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

export const Columns: ColumnDef<History>[] = [
  {
    id: 'select',
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
    accessorKey: 'historyId',
    header: 'ID',
    cell: ({ row }) => (
      <div className="citalize">{row.getValue('historyId')}</div>
    ),
  },
  {
    accessorKey: 'questionTitle',
    header: 'Title',
    cell: ({ row }) => <HistoryDialog history={row.original} />,
  },
  {
    accessorKey: 'questionDifficulty',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Difficulty
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div
        className={`h-full w-20 rounded-md p-1 text-center ${
          row.original['questionDifficulty'] === QuestionDifficulty.Easy
            ? 'bg-green-200 text-green-600'
            : row.original['questionDifficulty'] === QuestionDifficulty.Medium
            ? 'bg-yellow-100 text-yellow-600'
            : 'bg-red-200 text-red-600'
        }`}
      >
        {row.original['questionDifficulty']}
      </div>
    ),
    sortingFn: (rowA, rowB, columnId) => {
      const difficultyOrder = {
        [QuestionDifficulty.Easy]: 0,
        [QuestionDifficulty.Medium]: 1,
        [QuestionDifficulty.Hard]: 2,
      };

      const difficultyA = rowA.original[columnId];
      const difficultyB = rowB.original[columnId];

      return difficultyOrder[difficultyA] - difficultyOrder[difficultyB];
    },
  },
  {
    accessorKey: 'dateSubmitted',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Submitted On
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="citalize">{row.getValue('dateSubmitted')}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const history = row.original;

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
            <DropdownMenuItem>View full history session</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
