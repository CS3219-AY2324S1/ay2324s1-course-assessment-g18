// import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export const matchingSocket = io("http://127.0.0.1:6001");
export const chatSocket = io("http://127.0.0.1:5001");

// const navigate = useNavigate();

// matchingSocket.on("matchSuccess", (payload) => {
//   navigate("/session");
// });
