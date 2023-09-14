import { TableCell } from "@/components/ui/table";
import { RxAvatar } from "react-icons/rx";

interface Props {
  id: string;
  username: string;
  email: string;
  role: string;
}

function User({ id, username, email, role }: Props) {
  return (
    <>
      <TableCell>
        <RxAvatar />
      </TableCell>
      <TableCell className="font-medium">{id}</TableCell>
      <TableCell>{username}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{role}</TableCell>
    </>
  );
}

export default User;
