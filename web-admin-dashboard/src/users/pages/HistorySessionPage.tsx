import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Language } from '../models/language.model';
import LanugageSelect from '../components/form/LanguageSelect';
import QuestionView from '../components/session/question-view/QuestionView';
import HistorySessionCodeEditor from '../components/session/code-editor/HistorySessionCodeEditor';
import HistorySessionChatBtn from '../components/session/chat/HistorySessionChatBtn';
import axios from 'axios';

function HistorySessionPage() {
  const location = useLocation();
  const [lang, setLang] = useState<Language>(Language.JavaScript);
  const history = location.state.history;
  console.log(`history: ${history.userEmail}`);
  localStorage.setItem('roomId', history.roomId);
  const question = {
    questionId: history.questionId,
    questionTitle: history.questionTitle,
    questionCategories: history.questionCategories,
    questionDifficulty: history.questionDifficulty,
    questionDescription: history.questionDescription,
    questionExamples: history.questionExamples,
    questionConstraints: history.questionConstraints,
    questionImages: history.questionImages,
  };
  const [code, setCode] = useState(history.codeExecuted);
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    console.log(newCode);
  };
  const user = localStorage.getItem('userInfo');
  const username = JSON.parse(user).username;
  // console.log(username);
  const peer = history.chatHistory
    ?.filter((chat) => chat.username !== username)
    ?.map((chat) => chat.username)[0];
  // console.log(peer);
  const roomId = history.roomId;
  const userEmail = history.userEmail;

  useEffect(() => {
    async function updateCode() {
      const res = await axios.put(
        import.meta.env.VITE_BASE_HISTORY_URL +
          `/history/updateCodeByRoomIdAndUserEmail/${roomId}/${userEmail}`,
        { codeExecuted: code },
      );
      console.log(res);
    }
    updateCode();
  }, [code, roomId, userEmail]);

  return (
    <div className="w-full h-full flex flex-row p-5">
      {/* left side */}
      <div className="h-full w-2/4 flex mt-5">
        <QuestionView question={question} />
      </div>
      {/* right side */}
      <div className="h-full w-2/4 flex flex-col">
        <div className="h-max w-40 pt-5 pb-5 flex ml-5">
          <LanugageSelect setData={setLang} data={lang} />
        </div>
        <HistorySessionCodeEditor
          roomId={history.roomId}
          language={lang}
          onCodeChange={handleCodeChange}
          codeHistory={code}
        />
        <HistorySessionChatBtn
          peer={peer}
          roomId={history.roomId}
          messages={history.chatHistory}
        />
      </div>
    </div>
  );
}

export default HistorySessionPage;
