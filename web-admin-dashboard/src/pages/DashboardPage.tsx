import "./DashboardPage.css";
import DashboardStats from "@/components/dashboard/statistics/DashboardStats";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import { useState, useEffect } from "react";
import QuestionList from "@/components/dashboard/question-list/QuestionList";
import { Question } from "@/questionrepo/question.model";
import LiveQuestionRepository from "@/questionrepo/LiveQuestionRepository";
import { QuestionRepoContext } from "@/context/QuestionRepoContext";

interface Props {
  handleClickDashboard: (event: React.MouseEvent) => void;
  handleClickUser: (event: React.MouseEvent) => void;
}

function DashboardPage({ handleClickDashboard, handleClickUser }: Props) {
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
      console.log(res);
      setData(res);
    };

    getDataBackend();
  }, [isChanged]);

  return (
    <QuestionRepoContext.Provider value={{ questionRepo, setQuestionRepo }}>
      <div className="dashboard-main">
        <DashboardStats dataLen={data.length} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          openSidebar={openSidebar}
          handleClickDashboard={handleClickDashboard}
          handleClickUser={handleClickUser}
        />
        <QuestionList data={data} setIsChanged={setIsChanged} />
      </div>
    </QuestionRepoContext.Provider>
  );
}

export default DashboardPage;
