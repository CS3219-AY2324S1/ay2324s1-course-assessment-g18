import "./DashboardPage.css";
import DashboardStats from "@/components/dashboard/statistics/DashboardStats";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import { useState, useEffect } from "react";
import QuestionList from "@/components/dashboard/question-list/QuestionList";
import { Question } from "@/models/question.model";
import { fallbackQuestions } from "@/models/fallback-data/questions.fallback";

function DashboardPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [data, setData] = useState<Question[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  useEffect(() => {
    const getData = () => {
      const qnsStringify = localStorage.getItem("questions");
      if (!qnsStringify) {
        // load fallback questions to localstorage
        localStorage.setItem("questions", JSON.stringify(fallbackQuestions));
        setData(fallbackQuestions);
      } else {
        const qns: Question[] = JSON.parse(qnsStringify);
        setData(qns);
      }
    };
    getData();
  }, [isAdding]);

  return (
    <div className="dashboard-main">
      <DashboardStats dataLen={data.length} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        openSidebar={openSidebar}
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
