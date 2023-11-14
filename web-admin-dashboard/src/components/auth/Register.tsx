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
import { AuthContext, AuthProvider } from "@/context/AuthProvider";
import LiveUserRepository from "@/userRepo/LiveUserRepository";
import { UserRole } from "@/userRepo/user.model";
import { motion, AnimatePresence } from "framer-motion";
import googleLogo from "../../assets/google.png";
import { Separator } from "@/components/ui/separator";
import passwordValidator from "password-validator";
import * as EmailValidator from "email-validator";

interface Props {
  setSelectedTab: Dispatch<SetStateAction<string>>;
}
function Register({ setSelectedTab }: Props) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  // Create a schema
  const schema = new passwordValidator();

  // Add properties to it
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(1) // Must have at least 1 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]) // Blacklist these values
    .has()
    .symbols(1); // Must have at least 1 symbol

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const error = invalidForm();
    const pwerror = validatePassword();
    if (error) {
      setError(error);
      return;
    } else if (Array.isArray(pwerror) && pwerror.length > 0) {
      console.log(pwerror);
      setError(
        "Password must be at least 8 characters long, have at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character and no spaces"
      );
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

          const createUser = await new LiveUserRepository().addUser(
            userName,
            userEmail,
            refreshToken,
            UserRole.User
          );
          const user = await new LiveUserRepository().getUser(userEmail);
          if (user) {
            setAuthState({ userInfo: user, loggedIn: true });
            localStorage.setItem("userInfo", JSON.stringify(user));
          }
          // Redirect to login page upon succesful signup
          setSelectedTab("Login");

          return toast({
            title: "Success!",
            description:
              "You have succesfully signed up as a user. Login now to get started!",
          });
        } else {
          setError("Signup failed. Please try again.");
        }
      } catch (err: any) {
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
      return "All fields are required.";
    }
    if (userName.length < 5) {
      return "Username must be at least 5 characters long.";
    }
    if (EmailValidator.validate(userEmail) === false) {
      return "Invalid email.";
    }
    return;
  }

  function validatePassword() {
    const pwschema = schema.validate(userPassword, { list: true });
    return pwschema;
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
          <div className="md:text-3xl font-bold text-xl text-center">
            Get Started with PeerPrep
          </div>
          <div className="md:text-base text-slate-500 mb-2 text-sm text-center">
            Enter your details to get started
          </div>
        </div>

        <div className="w-full flex flex-col">
          <Button className="mb-5 w-full flex gap-[10px] p-[10px] bg-white text-black border-[214.3 31.8% 91.4%] border-[1px] rounded-lg justify-center items-center hover:bg-black hover:text-white">
            <img src={googleLogo} className="w-5" />
            <div className="text-xs md:text-sm">Sign in with Google</div>
          </Button>
          <div className="flex w-full items-center justify-center gap-[10px] text-slate-300 md:text-base text-sm">
            <hr className="w-full border-t-slate-200" />
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
          <div className="md:flex-row flex-col flex gap-[10px] justify-center md:text-base text-sm text-center">
            Already have an account?{" "}
            <button
              onClick={() => setSelectedTab("Login")}
              className="text-[#5562eb] text-center md:text-base text-sm"
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
