import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import UserPage from "./pages/UserPage";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./users/components/navbar/Navbar";
import SessionPage from "./users/pages/SessionPage";
import UserDashboardPage from "./users/pages/UserDashboardPage";
import { AuthProvider } from "./context/AuthProvider";
import Sidebar from "./components/dashboard/sidebar/Sidebar";
import AdminProviderWrapper from "./components/admin-provider-wrapper/AdminProviderWrapper";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AdminProviderWrapper />}>
          <Route element={<Sidebar />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/users" element={<UserPage />} />
          </Route>
        </Route>

        <Route element={<Navbar />}>
          <Route path="/user-dashboard" element={<UserDashboardPage />} />
          <Route path="/session" element={<SessionPage />} />
        </Route>
      </Routes>

      <Toaster />
    </AuthProvider>
  );
}

export default App;
