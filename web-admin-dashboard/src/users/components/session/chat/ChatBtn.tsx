import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import MatchDialog from "../../match/MatchDialog";
import { Button } from "@/components/ui/button";
import { FiChevronUp } from "react-icons/fi";
import { IoChatbubbleOutline } from "react-icons/io5";
import "./ChatBtn.css";
import ChatCard from "./ChatCard";
import { User } from "@/userRepo/user.model";
import { Message } from "@/users/models/message.model";
import { chatSocket } from "../../match/sockets";
interface Props {
  peer: User;
  roomId: string;
}
function ChatBtn({ peer, roomId }: Props) {
  const [openChat, setOpenChat] = useState<boolean>(false);
  const messages: Message[] = [];

  const [messagesReceived, setMessagesReceived] = useState(messages);
  useEffect(() => {
    chatSocket.on("sendMessage", (message) => {
      console.log(message);
      setMessagesReceived((state: Message[]) => [
        ...state,
        {
          message: message.message,
          username: message.username,
        },
      ]);
    });
  }, [chatSocket]);

  return (
    <div className="flex">
      {openChat && (
        <div className="chat-card">
          <ChatCard
            setOpenChat={setOpenChat}
            peer={peer}
            roomId={roomId}
            messagesReceived={messagesReceived}
          />
        </div>
      )}
      <div onClick={() => setOpenChat(!openChat)} className="chat-btn">
        <IoChatbubbleOutline color="white" size="20px" />
      </div>
    </div>
  );
}

export default ChatBtn;
