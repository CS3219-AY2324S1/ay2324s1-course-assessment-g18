import { useEffect, useState } from "react";
import CodeEditor from "../components/session/code-editor/CodeEditor";
import QuestionView from "../components/session/question-view/QuestionView";
import ChatBtn from "../components/session/chat/ChatBtn";
import { useLocation } from "react-router-dom";
import { matchingSocket } from "../components/match/sockets";
import PeerLeftDialog from "../components/session/dialog/PeerLeftDialog";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import OutputWindow from "../components/session/output/OutputWindox";
import OutputDetails from "../components/session/output/OutputDetails";
import { classnames } from "@/utils/general";
import { languageOptions } from "../constants/languageOptions";
import LanguageSelect from "../components/form/LanguageSelect";
import { AnimatePresence, motion } from "framer-motion";
import SessionForm from "../components/session/SessionForm";
import { BsPlay } from "react-icons/bs";
import { Button } from "@/components/ui/button";
const javascriptDefault = `
console.log("hello");
`;
const tabs = ["Code", "Board"];

function SessionPage() {
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState<boolean | null>(null);
  const [peerLeft, setPeerLeft] = useState(false);
  const location = useLocation();
  const [code, setCode] = useState(javascriptDefault);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  useEffect(() => {
    console.log(location.state.question);
  });
  //   useEffect(() => {
  //     setStatus("loading");
  // api.get(`http://127.0.0.1:4001/questions/random/${location.state.difficulty}`).then((res) => {
  //     const question = res.data[0]['questionDifficulty'][0];
  //     console.log(question);
  //     setQuestion(question);
  //     setStatus("success");
  // }).catch((err) => console.log(err));
  //   }, [])

  matchingSocket.on("partnerLeaveSession", () => {
    console.log("partner left the session");
    setPeerLeft(true);
    //logic to show the dialog that partner left the session. Navigate to user-dashboard in 5 sec or smth.
  });

  function findLanguageByValue(value: any) {
    const foundLanguage = languageOptions.find(
      (language) => language.value === value
    );
    return foundLanguage;
  }

  const onSelectChange = (sl: any) => {
    sl = findLanguageByValue(sl);
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  const onChange = (action: any, data: any) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
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
    console.log("Source Code: ", formData.source_code);
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "875b0dafe3msh8f895723e4372eep18f2c1jsn22d2780362eb",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
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
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions" + "/" + token,
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "X-RapidAPI-Key": "875b0dafe3msh8f895723e4372eep18f2c1jsn22d2780362eb",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
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
        console.log("response.data", response.data);
        return toast({
          title: "Success!",
          description: "Compiled Successfully",
        });
      }
    } catch (err: any) {
      console.log("err", err);
      setProcessing(false);
      return toast({
        variant: "destructive",
        title: "Uh oh!",
        description: err.response.data.message,
      });
    }
  };
  const peer: string = location.state.matchedUser;
  return (
    <div className="flex flex-1 w-full h-[calc(100%-56px)]">
      <div className="w-full h-full flex flex-row p-5 gap-5">
        {/* left side */}
        <div className="h-full w-2/5 flex flex-col overflow-y-auto pr-5">
          {location.state.question === undefined ? (
            <h1>Loading</h1>
          ) : (
            <QuestionView question={location.state.question} />
          )}
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
                    selectedTab === tab ? "bg-slate-200" : "white"
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
                      ? "bg-slate-300 text-black hover:bg-slate-300"
                      : "text-green bg-green-500 hover:bg-green-400"
                  } ${!code ? "bg-slate-300 text-slate-500" : ""}
                
                flex justify-center items-center h-full w-max`}
                >
                  {processing ? (
                    <div className="flex text-black">Processing...</div>
                  ) : (
                    <div className="flex gap-[10px]">
                      {" "}
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
                style={{ width: "100%", height: "100%" }}
              >
                {selectedTab && (
                  <SessionForm
                    roomId={location.state.roomId}
                    mode={selectedTab}
                    setSelectedTab={setSelectedTab}
                    language={language.value}
                    onChange={onChange}
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
          <ChatBtn peer={peer} roomId={location.state.roomId} />
        </div>
        {peerLeft && <PeerLeftDialog peer={peer} />}
      </div>
    </div>
  );
}

export default SessionPage;
