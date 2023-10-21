import { AuthContext } from "@/context/AuthProvider";
import { QuestionRepoContext } from "@/context/QuestionRepoContext";
import { UserRepoContext } from "@/context/UserRepoContext";
import LiveQuestionRepository from "@/questionrepo/LiveQuestionRepository";
import { Question } from "@/questionrepo/question.model";
import LiveUserRepository from "@/userRepo/LiveUserRepository";
import { UserRole } from "@/userRepo/user.model";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

// this wrapper instantiates the QuestionRepository and the LiveQuestionRepository

function AdminProviderWrapper() {
  const [userRepo, setUserRepo] = useState<LiveUserRepository>(
    new LiveUserRepository()
  );
  const [questionRepo, setQuestionRepo] = useState<LiveQuestionRepository>(
    new LiveQuestionRepository()
  );

  const { authState } = useContext(AuthContext);
  const user = authState.userInfo;

  return user.role === UserRole.Admin ? (
    <UserRepoContext.Provider value={{ userRepo, setUserRepo }}>
      <QuestionRepoContext.Provider value={{ questionRepo, setQuestionRepo }}>
        <Outlet />
      </QuestionRepoContext.Provider>
    </UserRepoContext.Provider>
  ) : (
    <Navigate to="/unauthorized" />
  );
}

export default AdminProviderWrapper;
