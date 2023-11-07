function ChatHistory({ history }) {
  return (
    <div>
      {history.chatHistory.map((chat, index) => (
        <div key={index}>
          <strong>{chat.username}: </strong>
          {chat.message}
        </div>
      ))}
    </div>
  );
}

export default ChatHistory;
