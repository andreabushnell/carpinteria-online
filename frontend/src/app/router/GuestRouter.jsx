import { Routes, Route, Navigate } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import HomePage from "../../pages/store/HomePage";
import ProductDetailPage from "../../pages/store/ProductDetailPage";
import LoginPage from "../../pages/auth/LoginPage";
import RegisterPage from "../../pages/auth/RegisterPage";

export default function GuestRouter() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}