import { CSSProperties, Dispatch, SetStateAction } from "react";
import { Label } from "../ui/label";
import "./Input.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/userRepo/user.model";

interface Props {
  label: string;
  labelStyling?: CSSProperties;
  setData: Dispatch<SetStateAction<string>>;
  role: string;
}

function RoleSelect({ label, labelStyling, setData, role }: Props) {
  return (
    <div className="input-div">
      <Label
        className="input-label"
        style={{ ...labelStyling }}
        htmlFor="string"
      >
        {label}
      </Label>
      <Select
        onValueChange={(value) => {
          const val: UserRole = value as UserRole;
          setData(val);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={role} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="User">User</SelectItem>
          <SelectItem value="Admin">Admin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default RoleSelect;
