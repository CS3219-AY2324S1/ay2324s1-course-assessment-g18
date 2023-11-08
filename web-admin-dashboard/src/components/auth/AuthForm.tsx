import React, { Dispatch, SetStateAction } from "react";
import Login from "./Login";
import Register from "./Register";

interface Props {
  mode: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
}
function AuthForm({ mode, setSelectedTab }: Props) {
  return (
    <React.Fragment>
      <div>
        {mode === "Login" ? (
          <Login setSelectedTab={setSelectedTab} />
        ) : (
          <Register setSelectedTab={setSelectedTab} />
        )}
      </div>
    </React.Fragment>
  );
}

export default AuthForm;
