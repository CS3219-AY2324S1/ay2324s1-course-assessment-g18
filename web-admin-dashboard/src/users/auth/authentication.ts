import { User } from "@/userRepo/user.model";
import axios from "axios";

export async function updateUsername(userOldEmail: string, username: string) {
  try {
    const res = await axios.put(
      `http://localhost:4000/users/update/${userOldEmail}`,
      {
        username,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const response = res.data as User;
    return response;
  } catch (e) {
    console.log(e);
  }
}
