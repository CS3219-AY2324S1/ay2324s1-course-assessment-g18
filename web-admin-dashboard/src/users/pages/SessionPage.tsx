import React, { useRef, useState } from "react";
import CodeEditor from "../components/session/code-editor/CodeEditor";
import LanugageSelect from "../components/form/LanguageSelect";
import { Language } from "../models/language.model";
import QuestionView from "../components/session/question-view/QuestionView";
import { QuestionDifficulty } from "@/questionrepo/question.model";

function SessionPage() {
  const [lang, setLang] = useState<Language>(Language.JavaScript);
  const tempQn = {
    questionId: 1,
    _id: "e0bd7857-17b3-4811-9434-3f623efa78ae",
    questionTitle: "Two Sum",
    questionCategories: ["array"],
    questionDifficulty: QuestionDifficulty.Easy,
    questionDescription:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
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
      </div>
    </div>
  );
}

export default SessionPage;
