import * as React from "react";
import { Check, ChevronsUpDown, Scroll } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SelectOptions from "./SelectOptions";
import { Dispatch, SetStateAction } from "react";
import { ScrollArea } from "../ui/scroll-area";
import Select from "react-select";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

interface Props {
  selectedArray: string[];
  setSelectedArray: Dispatch<SetStateAction<string[]>>;
}
export function CustomSelect({ selectedArray, setSelectedArray }: Props) {
  const [open, setOpen] = React.useState(false);
  const categories = [
    { value: "array", label: "Array" },
    { value: "string", label: "String" },
    { value: "tree", label: "Tree" },
    { value: "linked-list", label: "Linked List" },
    { value: "dynamic-programming", label: "Dynamic Programming" },
    { value: "hash-table", label: "Hash Table" },
    { value: "math", label: "Math" },
    { value: "depth-first-search", label: "Depth-First Search" },
    { value: "breadth-first-search", label: "Breadth-First Search" },
    { value: "binary-search", label: "Binary Search" },
    // Add more categories as needed
  ];

  return (
    <Select
      closeMenuOnSelect={false}
      defaultValue={[categories[4]]}
      isMulti
      options={categories}
    />
  );
}
