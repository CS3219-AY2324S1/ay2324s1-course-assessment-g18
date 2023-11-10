import { useContext, useEffect, useRef } from "react";
import "./MatchDialog.css";
import { Separator } from "@/components/ui/separator";
import { useLocation, useNavigate } from "react-router-dom";
import DifficultyBtn from "../buttons/DifficultyBtn";
import { chatSocket, matchingSocket } from "./sockets";
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from "@/context/AuthProvider";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Countdown from "./Countdown";
import { IoIosArrowBack } from "react-icons/io";
import { Button } from "@/components/ui/button";

function WaitingMatch() {
  const { authState } = useContext(AuthContext);
  const username = authState.userInfo.username;
  const { toast } = useToast();
  const navigate = useNavigate();
  const { state } = useLocation();
  const difficulty = state.difficulty;
  const timeoutRef = useRef(null);
  matchingSocket.on("matchSuccess", (payload) => {
    const { matchedUserId, roomId } = payload;
    navigate("/session", {
      state: { roomId: roomId, matchedUser: matchedUserId },
    });
    // setOpenDialog(false);
  });

  useEffect(() => {
    let matchSuccessReceived = false;

    const matchSuccessHandler = (payload: any) => {
      const { matchedUserId, roomId, question } = payload;
      chatSocket.emit("joinRoom", { roomId, toLeaveRoom: "" });
      localStorage.setItem("roomId", roomId);
      navigate("/session", {
        state: {
          roomId: roomId,
          matchedUser: matchedUserId,
          difficulty: difficulty,
          question: question,
        },
      });
      matchSuccessReceived = true;
      toast({
        title: "Match found!",
        description: "A peer has joined the room.",
      });
    };

    matchingSocket.on("matchSuccess", matchSuccessHandler);

    // Set a timeout to check if "matchSuccess" is not received within 30 seconds
    timeoutRef.current = setTimeout(() => {
      if (!matchSuccessReceived) {
        // If "matchSuccess" is not received within 30 seconds, trigger an error.
        console.error("Match did not succeed within 30 seconds.");

        matchingSocket.emit("matchCancel", {
          difficulty: difficulty,
          userId: username,
        });
        navigate("/rematch");
        // You can throw an error or handle it according to your needs.
      }
    }, 30000);

    // To cancel the timeout if "matchSuccess" is received before it expires
    matchingSocket.on("matchSuccess", () => {
      clearTimeout(timeoutRef.current);
    });
  }, []);

  const handleBack = () => {
    navigate("/choose-match");
  };

  useEffect(() => {
    // clear timeout when component unmounts
    return () => {
      clearTimeout(timeoutRef.current);
      // dequeue user
      matchingSocket.emit("matchCancel", {
        userId: username,
      });
    };
  }, []);

  return (
    <div className="flex w-screen h-screen items-center justify-center bg-[#FAFBFF]">
      <Card className="w-[500px] flex flex-col justify-center p-5">
        <CardTitle className="flex gap-[10px] mt-[10px] mb-[10px] items-center">
          <Button onClick={handleBack} variant="ghost" className="w-[50px]">
            <IoIosArrowBack size="30px" />
          </Button>
          Finding your Match in <Countdown time={30} />
        </CardTitle>
        <CardDescription>
          PeerPrep is working to find your match within the next 30 seconds.
          Note that navigating back will remove you from the waiting room.
        </CardDescription>
        <Separator className="w-3/4 mt-[20px]" />
        <div className="flex flex-col gap-2 pt-3">
          <div className="text-slate-500">You have selected:</div>
          <div className="flex flex-row w-full items-center gap-3 text-slate-500">
            Difficulty: <DifficultyBtn level={difficulty} />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default WaitingMatch;
