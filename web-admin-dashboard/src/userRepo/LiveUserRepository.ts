import {User, UserRole} from "@/userRepo/user.model";
import axios from "axios";

class LiveUserRepository {
  config;

  constructor() {
    this.config = {
      baseURL: import.meta.env.VITE_BASE_LOCALHOST_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };
  }

  async getUsers(): Promise<User[]> {
    try {
      const res = await axios.get("/users", this.config);
      const data: User[] = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return [] as User[];
    }
  }

  async getUser(id: string): Promise<User | null> {
    try {
      const res = await axios.get(`users/${id}`, this.config);
      const data: User = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateUser(
    uId: number,
    userName: string,
    userEmail: string,
    userRole: UserRole,
  ): Promise<User> {
    const res = await axios.put(
      `users/${uId}`,
      {
        userName,
        userEmail,
        userRole,
      },
      this.config
    );
    const response = res.data as User;
    return response;
  }

  async deleteUser(id: string) {
    try {
      await axios.delete(`users/${id}`, this.config);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async saveQuestion(
    userName: string,
    userEmail: string,
    userRole: UserRole,
  ): Promise<User> {
    const res = await axios.post(
      "/users",
      {
        userName,
        userEmail,
        userRole,
      },
      this.config
    );
    const parsed = res.data as User;
    return parsed;
  }
}

export default LiveUserRepository;
