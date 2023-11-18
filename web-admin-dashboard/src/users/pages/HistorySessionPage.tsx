import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Language } from '../models/language.model';
import LanugageSelect from '../components/form/LanguageSelect';
import QuestionView from '../components/session/question-view/QuestionView';
import HistorySessionCodeEditor from '../components/session/code-editor/HistorySessionCodeEditor';
import HistorySessionChatBtn from '../components/session/chat/HistorySessionChatBtn';
import axios from 'axios';
import { languageOptions } from '../constants/languageOptions';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { BsPlay } from 'react-icons/bs';
import LanguageSelect from '../components/form/LanguageSelect';
import SessionForm from '../components/session/SessionForm';
import ChatBtn from '../components/session/chat/ChatBtn';
import PeerLeftDialog from '../components/session/dialog/PeerLeftDialog';
import OutputDetails from '../components/session/output/OutputDetails';
import OutputWindow from '../components/session/output/OutputWindox';
import { AnimatePresence, motion } from 'framer-motion';
import HistorySessionForm from '../components/session/HistorySessionForm';

const tabs = ['Code', 'Board'];

function HistorySessionPage() {
  const location = useLocation();
  const [lang, setLang] = useState<Language>(Language.JavaScript);
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState<boolean | null>(null);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const history = location.state.history;
  console.log(history);
  localStorage.setItem('roomId', history.roomId);
  const question = {
    _id: '',
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
  const peer = history.matchedPeer;
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

  function findLanguageByValue(value: any) {
    const foundLanguage = languageOptions.find(
      (language) => language.value === value,
    );
    return foundLanguage;
  }

  const onSelectChange = (sl: any) => {
    sl = findLanguageByValue(sl);
    console.log('selected Option...', sl);
    setLanguage(sl);
  };

  const onChange = (action: any, data: any) => {
    switch (action) {
      case 'code': {
        setCode(data);
        break;
      }
      default: {
        console.warn('case not handled!', action, data);
      }
    }
  };
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
    };
    console.log('Source Code: ', formData.source_code);
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: {
        base64_encoded: 'true',
        fields: '*',
      },
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': '875b0dafe3msh8f895723e4372eep18f2c1jsn22d2780362eb',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log('res.data', response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        const error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  };

  const checkStatus = async (token: string) => {
    const options = {
      method: 'GET',
      url: 'https://judge0-ce.p.rapidapi.com/submissions' + '/' + token,
      params: {
        base64_encoded: 'true',
        fields: '*',
      },
      headers: {
        'X-RapidAPI-Key': '875b0dafe3msh8f895723e4372eep18f2c1jsn22d2780362eb',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      },
    };
    try {
      const response = await axios.request(options);
      const statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        console.log('response.data', response.data);
        return toast({
          title: 'Success!',
          description: 'Compiled Successfully',
        });
      }
    } catch (err: any) {
      console.log('err', err);
      setProcessing(false);
      return toast({
        variant: 'destructive',
        title: 'Uh oh!',
        description: err.response.data.message,
      });
    }
  };

  return (
    <div className="flex flex-1 w-full h-[calc(100%-48px)]">
      <div className="w-full h-full flex flex-row p-5 gap-5">
        {/* left side */}
        <div className="h-full w-2/5 flex flex-col overflow-y-auto pr-5">
          <QuestionView question={question} />
        </div>
        {/* right side */}
        <div className="h-full w-3/5 flex flex-col gap-[15px]">
          <div className="w-full flex h-[40px] border-b-[1px]">
            <ul className="flex w-[200px] justify-evenly gap-[3px]">
              {tabs.map((tab, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedTab(tab)}
                  className={`${
                    selectedTab === tab ? 'bg-slate-200' : 'white'
                  } hover:bg-slate-200 cursor-pointer h-full flex w-full text-center items-center justify-center border-t-[1px] border-l-[1px] border-r-[1px] rounded-md rounded-b-none transition duration-200`}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>
          {selectedTab === tabs[0] && (
            <div className="h-max w-full flex justify-between">
              <div className="w-1/5">
                <LanguageSelect onSelectChange={onSelectChange} />
              </div>
              <div className="">
                <Button
                  onClick={handleCompile}
                  disabled={!code}
                  className={`${
                    processing
                      ? 'bg-slate-300 text-black hover:bg-slate-300'
                      : 'text-green bg-green-500 hover:bg-green-400'
                  } ${!code ? 'bg-slate-300 text-slate-500' : ''}
                
                flex justify-center items-center h-full w-max`}
                >
                  {processing ? (
                    <div className="flex text-black">Processing...</div>
                  ) : (
                    <div className="flex gap-[10px]">
                      {' '}
                      Run
                      <BsPlay size={20} />
                    </div>
                  )}
                </Button>
              </div>
            </div>
          )}
          {/* <CodeEditor
          roomId={location.state.roomId}
          language={language.value}
          onChange={onChange}
        /> */}
          <main className="flex w-full min-h-[350px] flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', height: '100%' }}
              >
                {selectedTab && (
                  <HistorySessionForm
                    roomId={history.roomId}
                    mode={selectedTab}
                    setSelectedTab={setSelectedTab}
                    language={language.value}
                    onChange={onChange}
                    onCodeChange={handleCodeChange}
                    codeHistory={history.codeExecuted}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          <div className="w-full flex flex-1 flex-row max-h-[210px] pt-2 border-t-[1px]">
            <div className="h-full w-full flex flex-col pr-5">
              <OutputWindow outputDetails={outputDetails} />
            </div>
            <div className="h-full w-60 flex flex-col mt-10">
              {outputDetails && <OutputDetails outputDetails={outputDetails} />}
            </div>
          </div>
          <HistorySessionChatBtn
            peer={peer}
            roomId={history.roomId}
            messages={history.chatHistory}
          />
        </div>
      </div>
    </div>
  );
}

export default HistorySessionPage;
