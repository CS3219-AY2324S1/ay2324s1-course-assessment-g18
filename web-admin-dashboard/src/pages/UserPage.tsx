import "./UserPage.css";
import UserList from "@/components/users/user-list/UserList";
import { User } from "@/userRepo/user.model";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { UserRepoContext } from "@/context/UserRepoContext";

function UserPage() {
  const [data, setData] = useState<User[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const { userRepo } = useContext(UserRepoContext);

  useEffect(() => {
    async function getDataBackend() {
      const res: User[] = await userRepo.getUsers();
      console.log(res);
      setData(res);
    }

    getDataBackend();
  }, [isChanged, userRepo]);

  return (
    <div className="user-main">
      <UserList data={data} setIsChanged={setIsChanged} />
    </div>
  );
}

export default UserPage;
