import { Message } from "@/users/models/message.model";
import React from "react";
import "./ChatBubble.css";

interface Props {
  msg: Message;
}
function ChatBubble({ msg }: Props) {
  const { message, username } = msg;
  return (
    <div className="bubble-container bubble-container-me">
      <div className="text-xs text-clip">{message}</div>
    </div>
  );
}

export default ChatBubble;
