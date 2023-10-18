import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import TextInput from "./input/TextInput";
import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";
import { User } from "@/userRepo/user.model";
import { Message } from "@/users/models/message.model";
import { chatSocket } from "../../match/sockets";

interface Props {
  setOpenChat: Dispatch<SetStateAction<boolean>>;
  peer: User;
  roomId: String;
  messagesReceived: Message[];
}
function ChatCard({ setOpenChat, peer, roomId, messagesReceived }: Props) {

//   const tempMessages: Message[] = [
//     {
//       message:
//         "Hey there Johndoe this question is really hard, what do you say?",
//       username: "johnnydepp",
//     },
//     {
//       message: "Hey there Johndoe",
//       username: "johndoe",
//     },
//   ];

  return (
    <Card className="w-[300px] h-[400px]">
      <div className="flex p-5 flex-col h-full w-full">
        <ChatHeader setOpenChat={setOpenChat} peer={peer}/>
        <ChatContainer messages={messagesReceived}/>
        <TextInput roomId={roomId}/>
      </div>
    </Card>
  );
}

export default ChatCard;
