import "./DashboardPage.css";
import DashboardStats from "@/components/dashboard/statistics/DashboardStats";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import { useState, useEffect } from "react";
import QuestionList from "@/components/dashboard/question-list/QuestionList";
import { Question } from "@/questionrepo/question.model";
import FallbackQuestionRepository from "@/questionrepo/FallbackQuestionRepository";
import { IsChangedContext } from "@/context/IsChangedContext";

interface Props {
  handleClickDashboard: (event: React.MouseEvent) => void;
  handleClickUser: (event: React.MouseEvent) => void;
}

function DashboardPage({ handleClickDashboard, handleClickUser }: Props) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [data, setData] = useState<Question[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(true);

  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  useEffect(() => {
    const getData = () => {
      if (isChanged === true) {
        const qns: Question[] = FallbackQuestionRepository.getQuestions();
        setData(qns);
      }
    };
    getData();
  }, [isChanged]);

  return (
    <IsChangedContext.Provider value={{ isChanged, setIsChanged }}>
      <div className="dashboard-main">
        <DashboardStats dataLen={data.length} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          openSidebar={openSidebar}
          handleClickDashboard={handleClickDashboard}
          handleClickUser={handleClickUser}
        />
        <QuestionList data={data} />
      </div>
    </IsChangedContext.Provider>
  );
}

export default DashboardPage;
