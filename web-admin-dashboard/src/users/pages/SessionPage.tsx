import React, { useEffect, useRef, useState } from "react";
import CodeEditor from "../components/session/code-editor/CodeEditor";
import QuestionView from "../components/session/question-view/QuestionView";
import { QuestionDifficulty } from "@/questionrepo/question.model";
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
import api from "@/utils/api";


const javascriptDefault = `
console.log("hello");
`;

function SessionPage() {
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState<boolean | null>(null);
  const [peerLeft, setPeerLeft] = useState(false);
  const [question, setQuestion] = useState({});
  const [status, setStatus] = useState("success");
  const location = useLocation();
  const [code, setCode] = useState(javascriptDefault);
  const [language, setLanguage] = useState(languageOptions[0]);

  useEffect(() => {
    console.log(location.state.question);
  })
//   useEffect(() => {
//     setStatus("loading");
    // api.get(`http://127.0.0.1:4001/questions/random/${location.state.difficulty}`).then((res) => {
    //     const question = res.data[0]['questionDifficulty'][0];
    //     console.log(question);
    //     setQuestion(question);
    //     setStatus("success");
    // }).catch((err) => console.log(err));
//   }, [])
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

  matchingSocket.on("partnerLeaveSession", (payload) => {
    console.log("partner left the session");
    setPeerLeft(true);
    //logic to show the dialog that partner left the session. Navigate to user-dashboard in 5 sec or smth.
  });

  function findLanguageByValue(value) {
    const foundLanguage = languageOptions.find((language) => language.value === value);
    return foundLanguage;
  }

  const onSelectChange = (sl) => {
    sl = findLanguageByValue(sl);
    console.log("selected Option...", sl);
    setLanguage(sl);
  };
  
  const onChange = (action, data) => {
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
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: {
        base64_encoded: 'true',
        fields: '*'
      },
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': '875b0dafe3msh8f895723e4372eep18f2c1jsn22d2780362eb',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
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
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: 'GET',
      url: 'https://judge0-ce.p.rapidapi.com/submissions' + '/' + token,
      params: {
        base64_encoded: 'true',
        fields: '*'
      },
      headers: {
        'X-RapidAPI-Key': '875b0dafe3msh8f895723e4372eep18f2c1jsn22d2780362eb',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

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
    } catch (err) {
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
    <div className="w-full h-full flex flex-row p-5">
      {/* left side */}
      <div className="h-full w-2/5 flex flex-col mt-5">
        {location.state.question === undefined ? (<h1>Loading</h1>) : 
        (<QuestionView question={location.state.question} />)}
      </div>
      {/* right side */}
      <div className="h-full w-3/5 flex flex-col">
        <div className="h-max w-full pt-5 pb-5 flex ml-5 justify-between p-5">
          <div className="w-1/5">
            <LanguageSelect onSelectChange={onSelectChange} />
          </div>
          <div className="pr-10">
            <button
                onClick={handleCompile}
                disabled={!code}
                className={classnames(
                  " z-10  px-4 py-1 hover:shadow transition duration-200 bg-green-400 flex-shrink-0 rounded-lg",
                  !code ? "opacity-50" : ""
                )}
              >
                {processing ? "Processing..." : "Run"}
            </button>
          </div>

        </div>
        <CodeEditor roomId="1" language={language.value} onChange={onChange}/>
        <div className="w-full h-2/5 flex flex-row p-5">
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
  );
}

export default SessionPage;


