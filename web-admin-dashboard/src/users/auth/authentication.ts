import LiveUserRepository from "@/userRepo/LiveUserRepository";
import { User } from "@/userRepo/user.model";
import api from "@/utils/api";

const userRepo = new LiveUserRepository();

export async function updateUsername(userOldEmail: string, username: string) {
  const res = await api.put(
    import.meta.env.VITE_BASE_USERHOST_URL + `/users/update/${userOldEmail}`,
    {
      username,
    }
  );
  const response = res.data as User;
  return response;
}

export async function getMyself(email: string) {
  try {
    const res = await api.get(
      import.meta.env.VITE_BASE_USERHOST_URL + `/users/getUser/${email}`
    );
    const response = res.data as User;
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteMyself(email: string) {
  const res1 = await api.delete(
    import.meta.env.VITE_BASE_AUTH_URL + `/auth/delete/${email}`
  );
  const res2 = await userRepo.deleteUser(email);
  return res1 && res2;
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
  email: string
) {
  const res = await api.put(
    import.meta.env.VITE_BASE_AUTH_URL + `/auth/update`,
    {
      email,
      currentPassword,
      newPassword,
    }
  );
  return res;
}
