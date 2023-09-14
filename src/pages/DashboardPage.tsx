import "./DashboardPage.css";
import DashboardStats from "@/components/dashboard/statistics/DashboardStats";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import { useState, useEffect } from "react";
import QuestionList from "@/components/dashboard/question-list/QuestionList";
import { Question } from "@/questionrepo/question.model";
import FallbackQuestionRepository from "@/questionrepo/FallbackQuestionRepository";

interface Props {
  handleClickDashboard: (event: React.MouseEvent) => void;
  handleClickUser: (event: React.MouseEvent) => void;
}

function DashboardPage({ handleClickDashboard, handleClickUser }: Props) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [data, setData] = useState<Question[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  useEffect(() => {
    const getData = () => {
      const qns: Question[] = FallbackQuestionRepository.getQuestions();
      setData(qns);
    };
    getData();
  }, [isAdding]);

  return (
    <div className="dashboard-main">
      <DashboardStats dataLen={data.length} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        openSidebar={openSidebar}
        handleClickDashboard={handleClickDashboard}
        handleClickUser={handleClickUser}
      />
      <QuestionList
        isChanged={isAdding}
        setIsChanged={setIsAdding}
        data={data}
      />
    </div>
  );
}

export default DashboardPage;
