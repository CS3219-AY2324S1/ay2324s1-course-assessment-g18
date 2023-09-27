import { User, UserRole } from "./user.model";
import axios from "axios";

class LiveQuestionRepository {
  config;

  constructor() {
    this.config = {
      baseURL: "http://localhost:4000",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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

  async getUser(userEmail: string): Promise<User | null> {
    try {
      const res = await axios.get(`/users/getUser/${userEmail}`, this.config);
      const data: User = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateUser(
    username: string,
    userEmail: string,
    userRole: UserRole,
    id: number
  ): Promise<User> {
    const res = await axios.put(
      `/users/update/${userEmail}`,
      {
        username,
        userEmail,
        userRole,
      },
      this.config
    );
    const user = res.data as User;
    return user;
  }

  async deleteUser(userEmail: string) {
    try {
      await axios.delete(`/users/${userEmail}`, this.config);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // temporary for adding user, need to route to auth after implementing signup/login
  async addUser(
    username: string,
    userEmail: string,
    userRole: UserRole
  ): Promise<User> {
    const res = await axios.post(
      "/users/create",
      {
        username,
        userEmail,
        userRole,
      },
      this.config
    );
    const parsed = res.data as User;
    return parsed;
  }
}

export default LiveQuestionRepository;
