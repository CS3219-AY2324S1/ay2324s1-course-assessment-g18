import { Message } from '@/users/models/message.model';
import { useState } from 'react';
import ChatCard from './ChatCard';
import { IoChatbubbleOutline } from 'react-icons/io5';
import './ChatBtn.css';

interface Props {
  peer: string;
  roomId: string;
  messages: Message[];
}

function HistorySessionChatBtn({ peer, roomId, messages }: Props) {
  const [openChat, setOpenChat] = useState<boolean>(false);

  return (
    <div className="flex">
      {openChat && (
        <div className="chat-card">
          <ChatCard
            setOpenChat={setOpenChat}
            peer={peer}
            roomId={roomId}
            messagesReceived={messages}
          />
        </div>
      )}
      <div onClick={() => setOpenChat(!openChat)} className="chat-btn">
        <IoChatbubbleOutline color="white" size="20px" />
      </div>
    </div>
  );
}

export default HistorySessionChatBtn;
