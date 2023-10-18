import "./DashboardPage.css";
import DashboardStats from "@/components/dashboard/statistics/DashboardStats";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import { useState, useEffect, useContext } from "react";
import QuestionList from "@/components/dashboard/question-list/QuestionList";
import { Question } from "@/questionrepo/question.model";
import LiveQuestionRepository from "@/questionrepo/LiveQuestionRepository";
import { QuestionRepoContext } from "@/context/QuestionRepoContext";
import { AuthContext } from "@/context/AuthProvider";

function DashboardPage() {
  const { authState } = useContext(AuthContext);
  const user = authState.userInfo;
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [data, setData] = useState<Question[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [questionRepo, setQuestionRepo] = useState<LiveQuestionRepository>(
    new LiveQuestionRepository()
  );

  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  useEffect(() => {
    const getDataBackend = async () => {
      const res: Question[] = await questionRepo.getQuestions();
      setData(res);
    };

    getDataBackend();
  }, [isChanged, questionRepo]);

  return (
    <QuestionRepoContext.Provider value={{ questionRepo, setQuestionRepo }}>
      <div className="dashboard-main">
        <div className="greetings">
          {" "}
          Hello, {user.username} <p className="text-xl">👋🏻</p>
        </div>
        <DashboardStats dataLen={data.length} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          openSidebar={openSidebar}
        />
        <QuestionList data={data} setIsChanged={setIsChanged} />
      </div>
    </QuestionRepoContext.Provider>
  );
}

export default DashboardPage;
