import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "./Input.css";
import { languageOptions } from "@/users/constants/languageOptions";
import { Language } from "@/users/models/language.model";
interface Props {
  onSelectChange: any;
}
export default function LanguageSelect({ onSelectChange } : Props ) {
  return (
    <div className="input-div">
      <Select
        onValueChange={(selectedOption) => onSelectChange(selectedOption)}
        defaultValue={languageOptions[0].value}
      >
        <SelectTrigger className="flex">
          <SelectValue placeholder={'Filter By Category'} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={languageOptions[0].value}>JavaScript</SelectItem>
          <SelectItem value={languageOptions[1].value}>C</SelectItem>
          <SelectItem value={languageOptions[2].value}>Java</SelectItem>
          <SelectItem value={languageOptions[3].value}>Python</SelectItem>
          <SelectItem value={languageOptions[4].value}>C++</SelectItem>
          <SelectItem value={languageOptions[5].value}>SQL</SelectItem>
          <SelectItem value={Language.HTML}>HTML</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
