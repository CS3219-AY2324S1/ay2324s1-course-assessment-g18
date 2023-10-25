import { QuestionRepoContext } from "@/context/QuestionRepoContext";
import { UserRepoContext } from "@/context/UserRepoContext";
import LiveQuestionRepository from "@/questionrepo/LiveQuestionRepository";
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

  return (
    <UserRepoContext.Provider value={{ userRepo, setUserRepo }}>
      <QuestionRepoContext.Provider value={{ questionRepo, setQuestionRepo }}>
        <Outlet />
      </QuestionRepoContext.Provider>
    </UserRepoContext.Provider>
  );
}

export default AdminProviderWrapper;
