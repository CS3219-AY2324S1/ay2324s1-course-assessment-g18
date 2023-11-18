import { Message } from "@/users/models/message.model";
import "./ChatBubble.css";

interface Props {
  msg: Message;
  isMe: boolean;
}
function ChatBubble({ msg, isMe }: Props) {
  const { message } = msg;
  return (
    <div
      className={
        isMe ? "bubble-container-me bubble-container" : "bubble-container"
      }
    >
      <div className="text-xs text-clip">{message}</div>
    </div>
  );
}

export default ChatBubble;
