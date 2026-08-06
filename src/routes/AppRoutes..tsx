import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Logout from "../pages/logout/Logout";

import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

import CategoryForm from "../pages/category/categoryForm";
import CategoryList from "../pages/category/categoryList";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/category" element={<CategoryList />} />

          <Route path="/category/create" element={<CategoryForm />} />

          <Route path="/category/edit/:id" element={<CategoryForm />} />
        </Route>
      </Route>

      {/* Logout */}

      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}
