import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction, useState } from "react";
import MatchDialog from "../../match/MatchDialog";
import { Button } from "@/components/ui/button";
import { FiChevronUp } from "react-icons/fi";
import { IoChatbubbleOutline } from "react-icons/io5";
import "./ChatBtn.css";
import ChatCard from "./ChatCard";
import { User } from "@/userRepo/user.model";
interface Props {
  peer: User;
}
function ChatBtn({ peer }: Props) {
  const [openChat, setOpenChat] = useState<boolean>(false);

  return (
    <div className="flex">
      {openChat && (
        <div className="chat-card">
          <ChatCard setOpenChat={setOpenChat} peer={peer} />
        </div>
      )}
      <div onClick={() => setOpenChat(!openChat)} className="chat-btn">
        <IoChatbubbleOutline color="white" size="20px" />
      </div>
    </div>
  );
}

export default ChatBtn;
