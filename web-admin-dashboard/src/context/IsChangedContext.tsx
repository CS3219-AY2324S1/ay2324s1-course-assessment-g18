import { createContext } from "react";

export const IsChangedContext = createContext({
  isChanged: false,
  setIsChanged: (isChanged: boolean) => {},
});
