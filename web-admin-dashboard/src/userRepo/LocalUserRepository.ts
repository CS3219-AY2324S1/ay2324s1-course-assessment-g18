import {User, UserRole} from "@/userRepo/user.model";
class LocalUserRepository {
  // Function to retrieve users from localStorage
  static getUsers() {
    const currStringify = localStorage.getItem("users");
    return currStringify ? JSON.parse(currStringify) : [];
  }

  // Function to update a user in localStorage
  static updateQuestion(user: User, userId: number) {
    try {
      const currArr: User[] = LocalUserRepository.getUsers();
      const newUser = {
        uId: userId,
        userName: user.userName,
        userEmail: user.userEmail,
        userRole: UserRole[user.userRole],
      };
      // Find index of the user with userId
      const indexOfQuestion = currArr.findIndex((u) => u.uId === userId);
      currArr[indexOfQuestion] = newUser;
      localStorage.setItem("questions", JSON.stringify(currArr));

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Function to delete a user from localStorage
  static deleteQuestion(userId: number) {
    try {
      const currArr: User[] = LocalUserRepository.getUsers();

      // Filter out the question with the specified questionId
      const updatedArr = currArr.filter((user) => user.uId !== userId);

      localStorage.setItem("users", JSON.stringify(updatedArr));

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  
  // Function to save a user to localStorage
  static saveQuestion(user: User) {
    try {
      const curr = LocalUserRepository.getUsers();

      const newUser = {
        uId: curr.length ? curr.length + 1 : 1,
        userName: user.userName,
        userEmail: user.userEmail,
        userRole: UserRole[user.userRole],
      };
      const newArr = curr.concat(newUser);
      localStorage.setItem("questions", JSON.stringify(newArr));

      return true; // Successfully saved
    } catch (error) {
      console.error(error);
      return false; // Failed to save
    }
  }
}

export default LocalUserRepository;
