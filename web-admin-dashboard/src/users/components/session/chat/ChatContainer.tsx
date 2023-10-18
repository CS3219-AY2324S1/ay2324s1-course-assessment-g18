import React, { useState } from "react";
import "./ChatContainer.css";
import ChatBubble from "./chat-bubble/ChatBubble";
import { Message } from "@/users/models/message.model";
import { chatSocket } from "../../match/sockets";

interface Props {
  messages: Message[]
}
function ChatContainer({ messages }: Props) {
    // const msg: Message[] = [];

    console.log(messages);
  return (
    <div className="chat-container">
      {messages.map((msg) => (
        <ChatBubble msg={msg}/>
      ))}
    </div>
  );
}

export default ChatContainer;
