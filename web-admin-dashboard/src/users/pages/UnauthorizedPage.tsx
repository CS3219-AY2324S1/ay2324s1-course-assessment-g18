import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <Card className="flex flex-col p-10 items-center gap-5">
        <CardTitle className="text-3xl">Oops!</CardTitle>
        <CardContent className="flex items-center justify-center flex-col gap-4 p-2">
          <div>You must be a PeerPrep admin to access this route.</div>
          <Button onClick={() => navigate("/user-dashboard")}>
            Back to dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default UnauthorizedPage;
