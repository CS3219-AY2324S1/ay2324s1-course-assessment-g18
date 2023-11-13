interface Props {
  history: any;
}
function ChatHistory({ history }: Props) {
  return (
    <div>
      {history.chatHistory.map((chat: any, index: any) => (
        <div key={index}>
          <strong>{chat.username}: </strong>
          {chat.message}
        </div>
      ))}
    </div>
  );
}

export default ChatHistory;
