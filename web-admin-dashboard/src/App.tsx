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
import Auth from "./pages/Auth";

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
      return (
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/signup" element={<SignUpPage />} /> */}
          <Route path="/auth" element={<Auth />} />

          <Route element={<AdminProviderWrapper />}>
            <Route element={<Sidebar />}>
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
          </Route>
        </Routes>
      );
    } 
   else {
    // User is not authenticated, go to /login
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/signup" element={<SignUpPage />} /> */}
        <Route path="/auth" element={<Auth />} />
      </Routes>
    );
  }
}

export default App;
