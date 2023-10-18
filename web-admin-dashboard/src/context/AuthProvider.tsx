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
      return true;
    }
    return false;
  };

  const logout = async () => {
    try {
      const response = await api.get("/auth/logout", {
        baseURL: import.meta.env.VITE_BASE_AUTH_URL,
      });
      if (response.status === 200) {
        navigate("/login");
        setAuthState({
          userInfo: {},
          loggedIn: false,
        });
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
