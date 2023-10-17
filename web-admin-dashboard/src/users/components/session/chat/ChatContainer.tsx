import React from "react";
import "./ChatContainer.css";
import ChatBubble from "./chat-bubble/ChatBubble";
import { Message } from "@/users/models/message.model";

interface Props {
  messages: Message[];
}
function ChatContainer({ messages }: Props) {
  return (
    <div className="chat-container">
      {messages.map((msg) => (
        <ChatBubble msg={msg} />
      ))}
    </div>
  );
}

export default ChatContainer;
