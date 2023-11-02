import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import UserPage from "./pages/UserPage";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./users/components/navbar/Navbar";
import SessionPage from "./users/pages/SessionPage";
import UserDashboardPage from "./users/pages/UserDashboardPage";
import { AuthContext, AuthProvider } from "./context/AuthProvider";
import Sidebar from "./components/dashboard/sidebar/Sidebar";
import AdminProviderWrapper from "./components/admin-provider-wrapper/AdminProviderWrapper";
import ChooseMatch from "./users/components/match/ChooseMatch";
import WaitingMatch from "./users/components/match/WaitingMatch";
import ReMatch from "./users/components/match/ReMatch";

function App() {
  return (
    <AuthProvider>
      <Content />
      <Toaster />
    </AuthProvider>
  );
}

function Content() {
  const { authState, isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated()) {
    if (authState.userInfo.role === "Admin") {
      // Admin user, go to /dashboard
      return (
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route element={<AdminProviderWrapper />}>
            <Route element={<Sidebar />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/users" element={<UserPage />} />
            </Route>
          </Route>
        </Routes>
      );
    } else {
      // Regular user, go to /user-dashboard
      return (
        <Routes>
          <Route path="/" element={<Navigate to="/user-dashboard" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route element={<Navbar />}>
            <Route path="/user-dashboard" element={<UserDashboardPage />} />
            <Route path="/session" element={<SessionPage />} />

            <Route path="/choose-match" element={<ChooseMatch />} />
            <Route path="/waiting-match" element={<WaitingMatch />} />
            <Route path="/rematch" element={<ReMatch />} />
          </Route>
        </Routes>
      );
    }
  } else {
    // User is not authenticated, go to /login
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    );
  }
}

export default App;
