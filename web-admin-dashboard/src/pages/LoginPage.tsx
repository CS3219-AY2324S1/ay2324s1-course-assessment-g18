import CustomInput from "@/components/form/CustomInput";
import React, { SyntheticEvent, useContext, useState } from "react";
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
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import LiveUserRepository from "@/userRepo/LiveUserRepository";
import { AuthContext } from "@/context/AuthProvider";
import { UserRole } from "@/userRepo/user.model";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const { setAuthState, isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const error = invalidForm();
    if (error) {
      setError(error);
      return;
    } else {
      try {
        const response = await axios.post("http://localhost:3000/auth/login", {
          email,
          password,
        });

        if (response.status === 201) {
          const { accessToken, refreshToken } = response.data;
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          const user = await new LiveUserRepository().getUser(email);

          if (user) {
            setAuthState({ userInfo: user, loggedIn: true });
            localStorage.setItem("userInfo", JSON.stringify(user));
            if (user.role === UserRole.Admin) {
              navigate("/dashboard");
            } else {
              navigate("/user-dashboard");
            }
          }

          // Implement logic for token refresh, expiration handling, etc.
        } else {
          setError("Login failed. Check your credentials.");
        }
      } catch (err) {
        console.error(err);
        setError("Login failed. Check your credentials.");
      }
    }
  };

  function invalidForm() {
    if (email.length === 0 || password.length === 0) {
      return "All fields are required.";
    }
  }

  return (
    <React.Fragment>
      {/* redirect to dashboard if authenticated, need to figure a way to redirect if its a user */}
      {/* {isAuthenticated() ? (
        <Navigate to="/dashboard" />
      ) : ( */}
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
              <Button type="submit" className="login-button">
                Login
              </Button>
            </form>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "20px",
              }}
            >
              <button
                onClick={() => navigate("/signup")}
                className="signup-button"
              >
                Don't have an account? Click here to sign up!
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* )} */}
    </React.Fragment>
  );
}

export default LoginPage;
