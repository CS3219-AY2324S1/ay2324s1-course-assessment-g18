import {User, UserRole} from "@/userRepo/user.model";
class LocalUserRepository {
  // Function to retrieve users from localStorage
  static getUsers() {
    const currStringify = localStorage.getItem("users");
    return currStringify ? JSON.parse(currStringify) : [];
  }

  // Function to update a user in localStorage
  static updateUser(user: User, userId: number) {
    try {
      const currArr: User[] = LocalUserRepository.getUsers();
      const newUser = {
        uId: userId,
        username: user.username,
        email: user.email,
        role: UserRole[user.role],
      };
      // Find index of the user with userId
      const indexOfUser = currArr.findIndex((u) => u.uId === userId);
      currArr[indexOfUser] = newUser;
      localStorage.setItem("users", JSON.stringify(currArr));

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Function to delete a user from localStorage
  static deleteUser(userId: number) {
    try {
      const currArr: User[] = LocalUserRepository.getUsers();

      // Filter out the user with the specified userId
      const updatedArr = currArr.filter((user) => user.uId !== userId);

      localStorage.setItem("users", JSON.stringify(updatedArr));

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  
  // Function to save a user to localStorage
  static saveUser(user: User) {
    try {
      const curr = LocalUserRepository.getUsers();

      const newUser = {
        uId: curr.length ? curr.length + 1 : 1,
        username: user.username,
        email: user.email,
        role: UserRole[user.role],
      };
      const newArr = curr.concat(newUser);
      localStorage.setItem("users", JSON.stringify(newArr));

      return true; // Successfully saved
    } catch (error) {
      console.error(error);
      return false; // Failed to save
    }
  }
}

export default LocalUserRepository;
