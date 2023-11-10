import { SyntheticEvent, useContext, useState } from "react";
import { IoIosSend } from "react-icons/io";
import "./TextInput.css";
import { chatSocket } from "@/users/components/match/sockets";
import { AuthContext } from "@/context/AuthProvider";

interface Props {
  roomId: String;
}

function TextInput({ roomId }: Props) {
  const { authState } = useContext(AuthContext);
  const user = authState.userInfo;
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // send message logic
    chatSocket.emit("message", {
      message: msg,
      username: user.username,
      currentRoom: roomId,
    });
    setMsg("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          placeholder="Enter Message"
          className="text-sm text-start"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <div
          className="send-btn"
          style={
            msg.length > 0 ? { background: "#5562eb", cursor: "pointer" } : {}
          }
          onClick={handleSubmit}
        >
          <IoIosSend color="white" />
        </div>
      </div>
    </form>
  );
}

export default TextInput;
