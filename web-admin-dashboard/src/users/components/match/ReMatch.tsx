import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function ReMatch() {
  const navigate = useNavigate();
  const handleRematch = () => {
    navigate("/choose-match");
  };
  const handleClose = () => {
    handleRematch();
    navigate("/user-dashboard");
  };
  return (
    <div className="flex w-screen h-screen items-center justify-center bg-[#FAFBFF]">
      <Card className="h-[200px] w-[500px] flex flex-col justify-between p-5">
        <div className="mt-[10px] flex flex-col gap-[10px]">
          <CardTitle className="">No match found...</CardTitle>
          <CardDescription>Would you like to rematch?</CardDescription>
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            onClick={handleClose}
            className="bg-white border-[#e2e8f0] border-[0.5px] w-[80px] text-black hover:bg-[#f4f4f5]"
          >
            No
          </Button>
          <Button
            onClick={handleRematch}
            className="w-[80px] bg-[#5562eb] hover:bg-[#6470ee]"
          >
            Yes
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default ReMatch;
