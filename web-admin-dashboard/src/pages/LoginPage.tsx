import CustomInput from "@/components/form/CustomInput";
import React, { SyntheticEvent, useState } from "react";
import "./LoginPage.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomPassword from "@/components/form/CustomPassword";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const error = invalidForm();
    if (error) {
      setError(error);
      return;
    } else {
      try {
        // TODO: integrate BE login function
      } catch (err) {
        console.log(err);
        setError(err.response.data.message);
      }
    }
  };

  function invalidForm() {
    if (email.length === 0 || password.length === 0) {
      return "All fields are required.";
    }
  }

  return (
    <div className="login-main">
      <Card className="login-content">
        <CardHeader className="header">
          <div>PeerPrep</div>
          <CardTitle className="text-3xl font-bold">Welcome back!</CardTitle>
          <CardDescription className="text-base text-slate-500">
            Enter your login details
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="login-form" onSubmit={onSubmit}>
            <CustomInput label="Email" setData={setEmail} data={email} />
            <CustomPassword
              label="Password"
              setData={setPassword}
              data={password}
            />
            <div className="text-red-400">{error}</div>
            <Button type="submit">Login</Button>
          </form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "20px",
            }}
          >
            <button onClick={() => navigate("/signup")}>
              Don't have an account? Click here to sign up!
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
