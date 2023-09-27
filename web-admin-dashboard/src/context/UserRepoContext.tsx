import LiveUserRepository from "@/userRepo/LiveUserRepository";
import { createContext } from "react";

export const UserRepoContext = createContext({
  userRepo: new LiveUserRepository(),
  setUserRepo: (userRepo: LiveUserRepository) => {},
});
