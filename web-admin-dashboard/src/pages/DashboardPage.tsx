import "./DashboardPage.css";
import DashboardStats from "@/components/dashboard/statistics/DashboardStats";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import { useState, useEffect } from "react";
import QuestionList from "@/components/dashboard/question-list/QuestionList";
import { Question } from "@/questionrepo/question.model";
import FallbackQuestionRepository from "@/questionrepo/FallbackQuestionRepository";
import { IsChangedContext } from "@/context/IsChangedContext";
import LiveQuestionRepository from "@/questionrepo/LiveQuestionRepository";

interface Props {
  handleClickDashboard: (event: React.MouseEvent) => void;
  handleClickUser: (event: React.MouseEvent) => void;
}

function DashboardPage({ handleClickDashboard, handleClickUser }: Props) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [data, setData] = useState<Question[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  useEffect(() => {
    const getData = () => {
      if (isChanged === true) {
        const qns: Question[] = FallbackQuestionRepository.getQuestions();
        console.log(qns);
        setData(qns);
      }
    };
    const getDataBackend = async () => {
      const res: Question[] = await LiveQuestionRepository.getQuestions();
      console.log(res);
      setData(res);
    };

    getDataBackend();
  }, [isChanged]);

  return (
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
  );
}

export default DashboardPage;
