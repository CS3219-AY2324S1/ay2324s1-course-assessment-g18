import React, { SyntheticEvent, useState } from "react";
import { IoIosSend } from "react-icons/io";
import "./TextInput.css";

function TextInput() {
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // send message logic
    console.log(msg);
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
