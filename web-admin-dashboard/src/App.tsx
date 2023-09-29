import DashboardPage from "./pages/DashboardPage";
import "./App.css";
import UserPage from "./pages/UserPage";
import { Toaster } from "./components/ui/toaster";
// import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />z
        <Route path="/users" element={<UserPage />} />
        <Route path="/" element={<DashboardPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
