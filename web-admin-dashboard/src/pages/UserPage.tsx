import "./UserPage.css";
import UserList from "@/components/users/user-list/UserList";
import { User } from "@/userRepo/user.model";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { UserRepoContext } from "@/context/UserRepoContext";
import { AuthContext } from "@/context/AuthProvider";

function UserPage() {
  const [data, setData] = useState<User[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const { authState } = useContext(AuthContext);
  const user = authState.userInfo;

  const { userRepo } = useContext(UserRepoContext);

  async function getDataBackend() {
    const res: User[] = await userRepo.getUsers();
    setData(res);
  }

  useEffect(() => {
    getDataBackend();
  }, [isChanged, userRepo, user]);

  return (
    <div className="user-main">
      <UserList data={data} setIsChanged={setIsChanged} />
    </div>
  );
}

export default UserPage;
