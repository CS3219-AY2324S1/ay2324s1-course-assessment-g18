import React, { useState } from "react";
import "./ChatContainer.css";
import ChatBubble from "./chat-bubble/ChatBubble";
import { Message } from "@/users/models/message.model";
import { chatSocket } from "../../match/sockets";

interface Props {
  messages: Message[];
}
function ChatContainer({ messages }: Props) {
    // const msg: Message[] = [];
  const [messagesRecieved, setMessagesReceived] = useState(messages);
  chatSocket.on('message', (message) => {
    setMessagesReceived((state : Message[]) => [
        ...state,
        {
          message: message.message,
          username: message.username,
        },
      ]);
});

  return (
    <div className="chat-container">
      {messagesRecieved.map((msg) => (
        <ChatBubble msg={msg} />
      ))}
    </div>
  );
}

export default ChatContainer;
