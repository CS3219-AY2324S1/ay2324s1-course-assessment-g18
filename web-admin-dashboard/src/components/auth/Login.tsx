import CustomInput from "@/components/form/CustomInput";
import React, {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useState,
} from "react";
import "../../pages/LoginPage.css";
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
import api from "@/utils/api";
import { DivideCircleIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  setSelectedTab: Dispatch<SetStateAction<string>>;
}
function Login({ setSelectedTab }: Props) {
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
        const authResponse = await axios.post(
          import.meta.env.VITE_BASE_AUTH_URL + "/auth/login",
          {
            email,
            password,
          }
        );

        if (authResponse.status === 201) {
          const { accessToken, refreshToken } = authResponse.data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          // Get user role from BE
          const user = await new LiveUserRepository().getUser(email);
          localStorage.setItem("userInfo", JSON.stringify(user));
          const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
          const role = userInfo["role"];
          console.log("Role: ", role);

          const roleTokens = await api.post(
            import.meta.env.VITE_BASE_AUTH_URL + "/auth/tokens",
            {
              email,
              role,
            }
          );

          if (roleTokens.status === 201) {
            const { accessToken, refreshToken } = roleTokens.data;
            // Set tokens with role
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            const userResponse = await api.put(
              import.meta.env.VITE_BASE_USERHOST_URL  + `/users/update/${email}`,
              {
                refreshToken: refreshToken,
              }
            );
            if (userResponse.status == 200) {
              if (user) {
                setAuthState({ userInfo: user, loggedIn: true });
                console.log("User:", user);
                  navigate("/dashboard");
              } else {
                console.log("User is NULL");
              }
            }
          }
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
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.2 }}
        style={{ height: "100%", width: "100%" }}
      >
        <div className="flex items-center flex-col justify-center">
          <div className="text-3xl font-bold">Welcome back!</div>
          <div className="text-base text-slate-500">
            Enter your login details
          </div>
        </div>

        <div>
          <form
            className="w-full h-full flex flex-1 flex-col gap-[10px] mb-[20px]"
            onSubmit={onSubmit}
          >
            <CustomInput label="Email" setData={setEmail} data={email} />
            <CustomPassword
              label="Password"
              setData={setPassword}
              data={password}
            />
            <div className="text-red-400">{error}</div>
            <Button type="submit" className="bg-[#5562eb] hover:bg-[#6470ee]">
              Login
            </Button>
          </form>
          <div className="flex gap-[10px] justify-center">
            Don't have an account?
            <button
              onClick={() => setSelectedTab("Register")}
              className="text-[#5562eb]"
            >
              Sign up now
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
