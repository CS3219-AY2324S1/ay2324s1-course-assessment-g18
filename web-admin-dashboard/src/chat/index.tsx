import styles from './styles.module.css';
import MessagesReceived from './messages';
import SendMessage from './send-message';

const Chat = ({ username, room, socket } : {socket: any, username: any, room: any}) => {
    return (
      <div className={styles.chatContainer}>
        <div>
          <MessagesReceived socket={socket} />
          <SendMessage username={username} room={room} />
        </div>
      </div>
    );
  };
export default Chat;