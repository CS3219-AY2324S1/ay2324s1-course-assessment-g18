import "../../pages/UserPage.css";
import "./UserList.css";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import User from "./User";
import { useState } from "react";

function UserList() {
  const [users, setUsers] = useState([
    {
      id: "1",
      username: "admin",
      password: "admin",
      email: "admin@test.com",
      role: "Admin",
    },
    {
      id: "2",
      username: "user1",
      password: "user1",
      email: "user1@test.com",
      role: "User",
    },
    {
      id: "3",
      username: "user2",
      password: "user2",
      email: "user2@test.com",
      role: "User",
    },
  ]);

  return (
    <div className="userlist-container">
      <div className="userlist-content">
        <Table className="user-table">
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              return (
                <>
                  <TableRow>
                    <User
                      id={user.id}
                      username={user.username}
                      email={user.email}
                      role={user.role}
                    />
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default UserList;
