import { User, UserRole } from "@/userRepo/user.model";
import api from "@/utils/api";

class LiveUserRepository {
  config;

  constructor() {
    this.config = {
      baseURL: import.meta.env.VITE_BASE_USERHOST_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };
  }

  async getUsers(): Promise<User[]> {
    try {
      const res = await api.get("/users", this.config);
      const data: User[] = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return [] as User[];
    }
  }

  async getUser(userEmail: string): Promise<User | null> {
    try {
      const res = await api.get(`/users/getUser/${userEmail}`, this.config);
      const data: User = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateUser(
    userOldEmail: string,
    username: string,
    email: string,
    role: UserRole
  ): Promise<User> {
    const res = await api.put(
      `/users/update/${userOldEmail}`,
      {
        username,
        email,
        role,
      },
      this.config
    );
    const response = res.data as User;
    return response;
  }

  async deleteUser(userEmail: string) {
    try {
      await api.delete(`/users/${userEmail}`, this.config);
      await api.delete(
        import.meta.env.VITE_BASE_AUTH_URL + `/auth/delete/${userEmail}`,
        this.config
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // temporary for adding user, need to route to auth after implementing signup/login
  async addUser(
    username: string,
    email: string,
    refreshToken: string,
    role: UserRole
  ): Promise<User> {
    const res = await api.post(
      "/users/create",
      {
        username,
        email,
        refreshToken,
        role,
      },
      this.config
    );
    const parsed = res.data as User;
    return parsed;
  }
}
export default LiveUserRepository;
