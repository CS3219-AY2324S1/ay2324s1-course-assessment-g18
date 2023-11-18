import DifficultySelect from '@/components/form/DifficultySelect';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { QuestionDifficulty } from '@/questionrepo/question.model';
import { useContext, useState } from 'react';
import { matchingSocket } from './sockets';
import { AuthContext } from '@/context/AuthProvider';
import { Card, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
function ChooseMatch() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [difficulty, setDifficulty] = useState<QuestionDifficulty>(
    QuestionDifficulty.Easy,
  );
  const user = authState.userInfo;
  const handleSubmit = () => {
    // matching logic here
    matchingSocket.emit('match', {
      difficulty: difficulty,
      userId: user.username,
      userEmail: user.email,
    });
    navigate('/waiting-match', { state: { difficulty: difficulty } });
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center bg-[#FAFBFF]">
      <Card className="p-5 w-[500px]">
        <CardTitle className="pb-3 flex gap-[10px] items-center">
          <Button
            onClick={() => navigate('/user-dashboard')}
            variant="ghost"
            className="w-[50px]"
          >
            <IoIosArrowBack size="30px" />
          </Button>
          Select your Preferences
        </CardTitle>
        <div className="">
          PeerPrep will attempt to pair you with another user who shares the
          same preferences.
        </div>
        <form onSubmit={handleSubmit} className="pt-3 pb-3 mt-3">
          <Label>Question difficulty:</Label>
          <DifficultySelect data={difficulty} setData={setDifficulty} />
          <Button type="submit" className="bg-[#5562eb] hover:bg-[#6470ee]">
            Confirm
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default ChooseMatch;
