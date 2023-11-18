import CustomInput from "@/components/form/CustomInput";
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "../../pages/LoginPage.css";
import { Button } from "@/components/ui/button";
import CustomPassword from "@/components/form/CustomPassword";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LiveUserRepository from "@/userRepo/LiveUserRepository";
import { AuthContext } from "@/context/AuthProvider";
import { UserRole } from "@/userRepo/user.model";
import api from "@/utils/api";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { JwtPayload } from "./Register";
import { jwtDecode } from "jwt-decode";

interface Props {
  setSelectedTab: Dispatch<SetStateAction<string>>;
}
function Login({ setSelectedTab }: Props) {
  const parentContainerRef = useRef<HTMLDivElement>(null);
  const [parentContainerWidth, setParentContainerWidth] = useState<number>(0);

  useEffect(() => {
    const updateParentContainerWidth = () => {
      if (parentContainerRef.current) {
        const width = parentContainerRef.current.clientWidth;
        setParentContainerWidth(width);
      }
    };

    window.addEventListener("resize", updateParentContainerWidth);

    // Call the function once to set the initial width
    updateParentContainerWidth();

    return () => {
      window.removeEventListener("resize", updateParentContainerWidth);
    };
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuthState } = useContext(AuthContext);

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
              import.meta.env.VITE_BASE_USERHOST_URL + `/users/update/${email}`,
              {
                refreshToken: refreshToken,
              }
            );
            if (userResponse.status == 200) {
              if (user) {
                setAuthState({ userInfo: user, loggedIn: true });
                console.log("User:", user);
                if (user.role === UserRole.Admin) {
                  navigate("/dashboard");
                } else {
                  navigate("/user-dashboard");
                }
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

  const handleGoogleLoginSuccess = async (response: any) => {
    console.log(response);
    console.log(jwtDecode(response.credential));
    const res = jwtDecode(response.credential);
    const { email, name } = res as JwtPayload;
    try {
      const authResponse = await axios.post(
        import.meta.env.VITE_BASE_AUTH_URL + "/auth/oauthLogin",
        {
          email: email,
        }
      );

      if (authResponse.status === 201) {
        const { accessToken, refreshToken } = authResponse.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        //   const createUser = await new LiveUserRepository().addUser(
        //     name,
        //     email,
        //     refreshToken,
        //     UserRole.User
        //   );
        const user = await new LiveUserRepository().getUser(email);
        if (!user) {
          const createUser = await new LiveUserRepository().addUser(
            name,
            email,
            refreshToken,
            UserRole.User
          );
        }
        if (user) {
          setAuthState({ userInfo: user, loggedIn: true });
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
              import.meta.env.VITE_BASE_USERHOST_URL + `/users/update/${email}`,
              {
                refreshToken: refreshToken,
              }
            );
            if (userResponse.status == 200) {
              if (user) {
                setAuthState({ userInfo: user, loggedIn: true });
                console.log("User:", user);
                if (user.role === UserRole.Admin) {
                  console.log("navigate to dashboard");
                  navigate("/dashboard");
                } else {
                  console.log("navigate to user-dashboard");
                  navigate("/user-dashboard");
                }
              } else {
                console.log("User is NULL");
              }
            }
          }
        } else {
          setError("Login failed. Check your credentials.");
        }
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err: any) {
      console.log(err);
      // setError(err.response.data.message);
    }
  };

  const handleGoogleLoginFailure = () => {
    console.error("Google login error");
    // Gérer les erreurs de connexion ici
  };

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
          <div className="md:text-3xl font-bold text-center text-xl">
            Welcome back!
          </div>
          <div className="md:text-base text-slate-500 text-center text-sm mb-2">
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
          <div className="flex gap-[10px] justify-center md:flex-row flex-col text-center md:text-base text-sm">
            Don't have an account?
            <button
              onClick={() => setSelectedTab("Register")}
              className="text-[#5562eb] text-center md:text-base text-sm"
            >
              Sign up now
            </button>
          </div>
          <div className="w-full flex items-center justify-center p-[10px] flex-col">
            <hr className="w-full border-t-slate-200 mb-4" />

            <div
              className="flex w-full items-center justify-center"
              ref={parentContainerRef}
            >
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginFailure}
                type="standard"
                width={parentContainerWidth}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
