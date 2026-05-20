import { Routes, Route } from "react-router-dom";

/* Layouts */
import StoreLayout from "../layouts/StoreLayout";
import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";

/* Store pages */
import HomePage from "../../pages/store/HomePage";
import ProductDetailPage from "../../pages/store/ProductDetailPage";
import CartPage from "../../pages/store/CartPage";

/* Auth pages */
import LoginPage from "../../pages/auth/LoginPage";
import RegisterPage from "../../pages/auth/RegisterPage";

/* Admin pages */
import DashboardPage from "../../pages/admin/DashboardPage";
import OrdersPage from "../../pages/admin/OrdersPage";
import CategoriesPage from "../../pages/admin/CategoriesPage";
import ProductsListPage from "../../pages/admin/ProductsListPage";
import ProductDetailPageAdmin from "../../pages/admin/ProductDetailPage";
import UsersListPage from "../../pages/admin/UsersListPage";
import UserDetailPage from "../../pages/admin/UserDetailPage";

export default function AppRouter() {
  return (
    <Routes>

      {/* ================= STORE ================= */}
      <Route element={<StoreLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>

      {/* ================= AUTH ================= */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* ================= ADMIN ================= */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/admin/orders" element={<OrdersPage />} />
        <Route path="/admin/categories" element={<CategoriesPage />} />
        <Route path="/admin/products/list" element={<ProductsListPage />} />
        <Route path="/admin/products/detail" element={<ProductDetailPageAdmin />} />
        <Route path="/admin/users/list" element={<UsersListPage />} />
        <Route path="/admin/users/detail" element={<UserDetailPage />} />
      </Route>

    </Routes>
  );
}