import React, { useRef, useState } from "react";
import CodeEditor from "../components/session/code-editor/CodeEditor";
import LanugageSelect from "../components/form/LanguageSelect";
import { Language } from "../models/language.model";
import QuestionView from "../components/session/question-view/QuestionView";
import { QuestionDifficulty } from "@/questionrepo/question.model";
import ChatBtn from "../components/session/chat/ChatBtn";
import { User, UserRole } from "@/userRepo/user.model";
import { useLocation } from "react-router-dom";
import { chatSocket } from "../components/match/sockets";

function SessionPage() {
  const [lang, setLang] = useState<Language>(Language.JavaScript);
  const location = useLocation();
  const tempQn = {
    questionId: 1,
    _id: "e0bd7857-17b3-4811-9434-3f623efa78ae",
    questionTitle: "Two Sum",
    questionCategories: ["array"],
    questionDifficulty: QuestionDifficulty.Easy,
    questionDescription:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    questionExamples: [
      ["nums = [2,7,11,15], target = 9", "[0,1]"],
      ["nums = [3,2,4], target = 6", "[1,2]"],
      ["nums = [3,3], target = 6", "[0,1]"],
    ],
    questionConstraints: "Hi this is a constraint",
  };

  const peer: User = {
    uId: 1,
    username: "johndoe",
    email: "ilovejohn@gmail.com",
    role: UserRole.User,
  };

  return (
    <div className="w-full h-full flex flex-row p-5">
      {/* left side */}
      <div className="h-full w-2/4 flex mt-5">
        <QuestionView question={tempQn} />
      </div>
      {/* right side */}
      <div className="h-full w-2/4 flex flex-col">
        <div className="h-max w-40 pt-5 pb-5 flex ml-5">
          <LanugageSelect setData={setLang} data={lang} />
        </div>
        <CodeEditor roomId="1" language={lang} />
        <ChatBtn peer={peer} roomId={location.state.roomId} />
      </div>
    </div>
  );
}

export default SessionPage;
