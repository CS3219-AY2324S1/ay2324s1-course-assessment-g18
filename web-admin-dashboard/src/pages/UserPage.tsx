import "./UserPage.css";
import UserList from "@/components/users/user-list/UserList";
import { User } from "@/userRepo/user.model";
import { useState } from "react";
import { useEffect } from "react";
import { UserRepoContext } from "@/context/UserRepoContext";
import DashboardStats from "@/components/dashboard/statistics/DashboardStats";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import LiveUserRepository from "@/userRepo/LiveUserRepository";

interface Props {
  handleClickDashboard: (event: React.MouseEvent) => void;
  handleClickUser: (event: React.MouseEvent) => void;
}

function UserPage({ handleClickDashboard, handleClickUser }: Props) {
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
        <DashboardStats dataLen={data.length} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          openSidebar={openSidebar}
          handleClickDashboard={handleClickDashboard}
          handleClickUser={handleClickUser}
        />
        <UserList data={data} setIsChanged={setIsChanged} />
      </div>
    </UserRepoContext.Provider>
  );
}

export default UserPage;
