import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import UserPage from "./pages/UserPage";
import { Toaster } from "./components/ui/toaster";
import UserDashboardPage from "./users/pages/UserDashboardPage";
import Navbar from "./users/components/navbar/Navbar";

function App() {
  // Check if the user is authenticated
  // This has to be modified #issue43
  const isAuthenticated = localStorage.getItem("accessToken");

  return (
    <div>
      <Routes>
        {/* Redirect to login page if not authenticated */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users" element={<UserPage />} />
        {/* placing user routes here temporarily first */}
        <Route element={<Navbar />}>
          <Route path="/user-dashboard" element={<UserDashboardPage />} />
        </Route>
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
