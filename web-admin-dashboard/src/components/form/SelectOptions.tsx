import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { CommandItem } from "../ui/command";
import CustomInput from "./CustomInput";

interface Props {
  cat: string;
  selectedArray: string[];
  setSelectedArray: Dispatch<SetStateAction<string[]>>;
}
function SelectOptions({ cat, selectedArray, setSelectedArray }: Props) {
  const addRemoveCat = () => {
    const temp = selectedArray;
    const index = temp.indexOf(cat);

    if (index === -1) {
      // If the string is not in the array, add it.
      temp.push(cat);
    } else {
      // If the string is already in the array, remove it.
      temp.splice(index, 1);
    }
    setSelectedArray(temp);
  };

  return (
    <div key={cat}>
      <Button onSelect={addRemoveCat} type="button">
        {cat}
      </Button>
    </div>
  );
}

export default SelectOptions;
