// import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export const matchingSocket = io(import.meta.env.VITE_MATCHING_URL );
export const chatSocket = io(import.meta.env.VITE_BASE_CHAT_URL );

// chatSocket.on("sendMessage", () => {
//   console.log("yay");
// });

// chatSocket.on("connect", () => {
//   console.log("chat connected");
// });

// matchingSocket.on("connect", () => {
//   console.log("match connected");
// });

// const navigate = useNavigate();

// matchingSocket.on("matchSuccess", (payload) => {
//   navigate("/session");
// });
