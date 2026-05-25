import { Routes, Route, Navigate } from "react-router-dom";
import GuestLayout from "../layouts/GuestLayout";
import HomePage from "../../pages/store/HomePage";
import ProductDetailPage from "../../pages/store/ProductDetailPage";
import LoginPage from "../../pages/auth/LoginPage";
import RegisterPage from "../../pages/auth/RegisterPage";

export default function GuestRouter() {
  return (
    <Routes>
      <Route element={<GuestLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}