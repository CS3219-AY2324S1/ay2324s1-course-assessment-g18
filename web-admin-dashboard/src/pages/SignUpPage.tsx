import CustomInput from "@/components/form/CustomInput";
import CustomPassword from "@/components/form/CustomPassword";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SyntheticEvent, useState } from "react";
import "./SignUpPage.css";

function SignUpPage() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const error = invalidForm();
    if (error) {
      setError(error);
      return;
    } else {
      try {
        // call to auth service to sign up
      } catch (err) {
        console.log(err);
        setError(err.respose.data.message);
      }
    }
  }

  function invalidForm() {
    if (
      userName.length === 0 ||
      userEmail.length === 0 ||
      userPassword.length === 0
    ) {
      return "All fields are required";
    }
  }

  return (
    <div className="signup-main">
      <Card className="signup-content">
        <CardHeader className="header">
          <div>PeerPrep</div>
          <CardTitle className="text-3xl font-bold">
            Welcome to PeerPrep!
          </CardTitle>
          <CardDescription className="text-base text-slate-500">
            Create an account to get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="signup-form" onSubmit={onSubmit}>
            <CustomInput
              label="Username"
              setData={setUserName}
              data={userName}
            />
            <CustomInput
              label="Email"
              setData={setUserEmail}
              data={userEmail}
            />
            <CustomPassword
              label="Password"
              setData={setUserPassword}
              data={userPassword}
            />
            <div className="text-red-400">{error}</div>
            <Button type="submit">Sign Up</Button>
          </form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "20px",
            }}
          >
            <button>Already have an account? Click here to login!</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUpPage;
