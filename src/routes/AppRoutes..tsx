import { Routes, Route } from "react-router-dom";

import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Logout from "../pages/logout/Logout";
import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      {/* Logout */}
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}
