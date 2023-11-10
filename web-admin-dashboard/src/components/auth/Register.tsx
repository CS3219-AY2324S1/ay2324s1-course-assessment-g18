import CustomInput from "@/components/form/CustomInput";
import CustomPassword from "@/components/form/CustomPassword";
import { Button } from "@/components/ui/button";
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useState,
} from "react";
import "../../pages/SignUpPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { AuthContext } from "@/context/AuthProvider";
import LiveUserRepository from "@/userRepo/LiveUserRepository";
import { motion } from "framer-motion";
import googleLogo from "../../assets/google.png";

interface Props {
  setSelectedTab: Dispatch<SetStateAction<string>>;
}
function Register({ setSelectedTab }: Props) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
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
        const authResponse = await axios.post(
          import.meta.env.VITE_BASE_AUTH_URL + "/auth/sign-up",
          {
            email: userEmail,
            password: userPassword,
          }
        );

        if (authResponse.status === 201) {
          const { accessToken, refreshToken } = authResponse.data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);


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
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.3 }}
        style={{ width: "100%" }}
      >
        <div className="flex flex-col w-full justify-center items-center gap-3">
          <div className="text-3xl font-bold">Get Started with PeerPrep</div>
          <div className="text-base text-slate-500 mb-5">
            Enter your details to get started
          </div>
        </div>

        <div className="w-full flex flex-col">
          <Button className="mb-5 w-full flex gap-[10px] p-[10px] bg-white text-black border-[214.3 31.8% 91.4%] border-[1px] rounded-lg justify-center items-center hover:bg-black hover:text-white">
            <img src={googleLogo} className="w-5" />
            <div>Sign in with Google</div>
          </Button>
          <div className="flex w-full items-center justify-center gap-[10px] text-slate-300">
            <hr className="w-full border-t-slate-200 " />
            or <hr className="w-full border-t-slate-200 " />
          </div>
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
            <Button type="submit" className="bg-[#5562eb] hover:bg-[#6470ee]">
              Sign Up
            </Button>
          </form>
          <div className="flex gap-[10px] justify-center">
            Already have an account?{" "}
            <button
              onClick={() => setSelectedTab("Login")}
              className="text-[#5562eb]"
            >
              Log in
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
export default Register;
