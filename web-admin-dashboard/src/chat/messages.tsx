import { MessageDto } from './message.model';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { chatSocket } from '@/users/components/match/sockets';



const Messages = ({ socket } : {socket: any}) => {
    const res: MessageDto[] = [];
  const [messagesRecieved, setMessagesReceived] = useState(res);
  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on('receive_message', (data : MessageDto) => {
      console.log(data);
      setMessagesReceived((state : MessageDto[]) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

	// Remove event listener on component unmount
    return () => socket.off('receive_message');
  }, [socket]);
    chatSocket.on('message', (message) => {
        setMessagesReceived((state : MessageDto[]) => [
            ...state,
            {
              message: message.message,
              username: message.username,
              __createdtime__: message.__createdtime__,
            },
          ]);
    });
  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp: string) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className={styles.messagesColumn}>
      {messagesRecieved.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.msgMeta}>{msg.username}</span>
            <span className={styles.msgMeta}>
              {formatDateFromTimestamp(msg.__createdtime__)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Messages;