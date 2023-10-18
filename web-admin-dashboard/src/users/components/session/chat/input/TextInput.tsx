import React, { SyntheticEvent, useState } from "react";
import { IoIosSend } from "react-icons/io";
import "./TextInput.css";
import { chatSocket } from "@/users/components/match/sockets";

interface Props {
    roomId: String
}

function TextInput({roomId} : Props) {
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // send message logic
    chatSocket.emit('message', { message: msg, username: "my user", currentRoom: roomId });

    // console.log(msg);
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
