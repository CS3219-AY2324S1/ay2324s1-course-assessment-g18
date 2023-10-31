import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";
import "./Input.css";
import { Language } from "@/users/models/language.model";
interface Props {
  setData: Dispatch<SetStateAction<Language>>;
  data: string;
}
export default function LanugageSelect({ data, setData }: Props) {
  return (
    <div className="input-div">
      <Select
        onValueChange={(value) => {
          const val: Language = value as Language;
          setData(val);
        }}
      >
        <SelectTrigger className="flex">
          <SelectValue placeholder={data} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={Language.Python}>Python</SelectItem>
          <SelectItem value={Language.Java}>Java</SelectItem>
          <SelectItem value={Language.JavaScript}>JavaScript</SelectItem>
          <SelectItem value={Language.C}>C</SelectItem>
          <SelectItem value={Language.HTML}>Html</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
