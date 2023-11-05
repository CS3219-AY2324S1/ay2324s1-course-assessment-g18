import { User } from "@/userRepo/user.model";
import api from "@/utils/api";

export async function updateUsername(userOldEmail: string, username: string) {
  const res = await api.put(
    `http://localhost:4000/users/update/${userOldEmail}`,
    {
      username,
    }
  );
  const response = res.data as User;
  return response;
}

export async function getMyself(email: string) {
  try {
    const res = await api.get(`http://localhost:4000/users/getUser/${email}`);
    const response = res.data as User;
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
}
