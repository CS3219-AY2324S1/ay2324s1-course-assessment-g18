import  { Dispatch, SetStateAction} from "react";
import { Card } from "@/components/ui/card";
import TextInput from "./input/TextInput";
import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";
import { Message } from "@/users/models/message.model";

interface Props {
  setOpenChat: Dispatch<SetStateAction<boolean>>;
  peer: string;
  roomId: string;
  messagesReceived: Message[];
}
function ChatCard({ setOpenChat, peer, roomId, messagesReceived }: Props) {
  return (
    <Card className="w-[300px] h-[400px]">
      <div className="flex p-5 flex-col h-full w-full">
        <ChatHeader setOpenChat={setOpenChat} peer={peer} />
        <ChatContainer messages={messagesReceived} />
        <TextInput roomId={roomId} />
      </div>
    </Card>
  );
}

export default ChatCard;
