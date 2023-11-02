import './DashboardPage.css';
import DashboardStats from '@/components/dashboard/statistics/DashboardStats';
import { useState, useEffect, useContext } from 'react';
import QuestionList from '@/components/dashboard/question-list/QuestionList';
import { Question } from '@/questionrepo/question.model';
import { QuestionRepoContext } from '@/context/QuestionRepoContext';
import { AuthContext } from '@/context/AuthProvider';
import { UserRepoContext } from '@/context/UserRepoContext';
import { User } from '@/userRepo/user.model';
import FallbackQuestionRepository from '@/questionrepo/FallbackQuestionRepository';

function DashboardPage() {
  const { authState } = useContext(AuthContext);
  const { questionRepo } = useContext(QuestionRepoContext);
  const { userRepo } = useContext(UserRepoContext);
  const user = authState.userInfo;
  const [data, setData] = useState<Question[]>([]);
  const [userLen, setUserLen] = useState<number>(0);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    const getQuestionsBe = async () => {
      const res: Question[] = await questionRepo.getQuestions();
      setData(res);
    };
    const getUsersBe = async () => {
      const res: User[] = await userRepo.getUsers();
      setUserLen(res.length);
    };
    getUsersBe();
    getQuestionsBe();
  }, [isChanged, questionRepo, userRepo]);

  return (
    <div className="dashboard-main">
      <div className="greetings">
        Hello, {user.username} <p className="text-xl">👋🏻</p>
      </div>
      <DashboardStats qnLen={data.length} userLen={userLen} />

      <QuestionList data={data} setIsChanged={setIsChanged} />
    </div>
  );
}

export default DashboardPage;
