import "./UserPage.css";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import UserList from "@/components/users/user-list/UserList";
import { User } from "@/userRepo/user.model";
import { useState } from "react";
import LiveUserRepository from "@/userRepo/LiveUserRepository";
import { useEffect } from "react";
import { UserRepoContext } from "@/context/UserRepoContext";

function UserPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [data, setData] = useState<User[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [userRepo, setUserRepo] = useState<LiveUserRepository>(
    new LiveUserRepository()
  );

  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  useEffect(() => {
    async function getDataBackend() {
      const res: User[] = await userRepo.getUsers();
      console.log(res);
      setData(res);
    }

    getDataBackend();
  }, [isChanged, userRepo]);

  return (
    <UserRepoContext.Provider value={{ userRepo, setUserRepo }}>
      <div className="user-main">
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          openSidebar={openSidebar}
        />
        <UserList data={data} setIsChanged={setIsChanged} />
      </div>
    </UserRepoContext.Provider>
  );
}

export default UserPage;
