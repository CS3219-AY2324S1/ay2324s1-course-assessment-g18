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
import { SyntheticEvent, useContext, useState } from "react";
import "./SignUpPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { AuthContext, AuthProvider } from "@/context/AuthProvider";
import LiveUserRepository from "@/userRepo/LiveUserRepository";

function SignUpPage() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState("user"); // Set default value to "user"
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const error = invalidForm();
    if (error) {
      setError(error);
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/sign-up",
          {
            username: userName,
            email: userEmail,
            password: userPassword,
            role: userRole,
          }
        );

        if (response.status === 201) {
          const user = await new LiveUserRepository().getUser(userEmail);
          if (user) {
            setAuthState({ userInfo: user, loggedIn: true });
            localStorage.setItem("userInfo", JSON.stringify(user));
          }
          // Redirect to login page upon succesful signup
          navigate("/login");
          return toast({
            title: "Success!",
            description: "You have succesfully signed up as a user",
          });
        } else {
          setError("Signup failed. Please try again.");
        }
      } catch (err) {
        console.log(err);
        setError(err.response.data.message);
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
            <Button type="submit" className="signup-button">
              Sign Up
            </Button>
          </form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "20px",
            }}
          >
            <button onClick={() => navigate("/login")} className="login-button">
              Already have an account? Click here to login!
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUpPage;
