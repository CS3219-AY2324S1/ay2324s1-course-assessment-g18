import { User } from "@/userRepo/user.model";
import React, { Dispatch, SetStateAction } from "react";
import { IoIosClose } from "react-icons/io";

interface Props {
  setOpenChat: Dispatch<SetStateAction<boolean>>;
  peer: User;
}
function ChatHeader({ setOpenChat, peer }: Props) {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="font-semibold text-sm">{peer.username}</div>
      <div className="cursor-pointer" onClick={() => setOpenChat(false)}>
        <IoIosClose size="25px" color="lightgray" />
      </div>
    </div>
  );
}

export default ChatHeader;
