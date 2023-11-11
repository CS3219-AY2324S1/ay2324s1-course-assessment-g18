import { useContext } from "react";
import "./ChatContainer.css";
import ChatBubble from "./chat-bubble/ChatBubble";
import { Message } from "@/users/models/message.model";
import { AuthContext } from "@/context/AuthProvider";

interface Props {
  messages: Message[];
}
function ChatContainer({ messages }: Props) {
  const { authState } = useContext(AuthContext);
  const user = authState.userInfo;

  return (
    <div className="chat-container">
      {messages.map((msg) => (
        <ChatBubble msg={msg} isMe={msg.username === user.username} />
      ))}
    </div>
  );
}

export default ChatContainer;
