import { useToast } from "@/components/ui/use-toast";
import { User } from "@/userRepo/user.model";
import api from "@/utils/api";
import { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export interface AuthContextProps {
  authState: AuthState;
  setAuthState: (authInfo: AuthState) => void;
  isAuthenticated: () => boolean;
  logout: () => void;
}

interface AuthState {
  userInfo: User;
  loggedIn: boolean;
}

interface Props {
  children?: ReactNode;
}

const AuthContext = createContext({} as AuthContextProps);
const { Provider } = AuthContext;

const AuthProvider = ({ children }: Props) => {
  const userInfo = localStorage.getItem("userInfo");
  const loggedIn = localStorage.getItem("accessToken");

  const navigate = useNavigate();
  const { toast } = useToast();

  const [authState, setAuthState] = useState({
    userInfo: userInfo ? JSON.parse(userInfo) : {},
    loggedIn: loggedIn ? true : false,
  });

  const setAuthInfo = ({ userInfo, loggedIn = false }: AuthState) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setAuthState({
      userInfo,
      loggedIn,
    });
  };

  const isAuthenticated = () => {
    // similar to the previous function in App.tsx
    if (authState.loggedIn) {
      console.log("User is logged in");
      return true;
    }
    return false;
  };

  const logout = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
      const email = userInfo['email'];
      
      const response = await api.put(`http://localhost:4000/users/update/${email}`, {
      // baseURL: import.meta.env.VITE_BASE_USERHOST_URL,
      refreshToken: null
      });
      if (response.status === 200) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate("/login");
        console.log("User is logged out");
        setAuthState({
          userInfo: {},
          loggedIn: false,
        });
        console.log(authState.loggedIn);
        toast({
          title: "Success!",
          description: "You have been logged out successfully.",
        });
      }
    } catch (e) {
      console.log(e);
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "An error occurred during logout.",
      });
    }
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo: AuthState) => setAuthInfo(authInfo),
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
