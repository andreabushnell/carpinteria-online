import { Routes, Route, Navigate } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import DashboardPage from "../../pages/admin/DashboardPage";
import OrdersPage from "../../pages/admin/OrdersPage";
import CategoriesPage from "../../pages/admin/CategoriesPage";
import ProductsListPage from "../../pages/admin/ProductsListPage";
import ProductDetailPageAdmin from "../../pages/admin/ProductDetailPage";
import UsersListPage from "../../pages/admin/UsersListPage";
import UserDetailPage from "../../pages/admin/UserDetailPage";

export default function AdminRouter() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/login" element={<Navigate to="/admin" replace />} />
        <Route path="/register" element={<Navigate to="/admin" replace />} />
        
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/admin/orders" element={<OrdersPage />} />
        <Route path="/admin/categories" element={<CategoriesPage />} />
        <Route path="/admin/products/list" element={<ProductsListPage />} />
        <Route path="/admin/products/detail" element={<ProductDetailPageAdmin />} />
        <Route path="/admin/users/list" element={<UsersListPage />} />
        <Route path="/admin/users/detail" element={<UserDetailPage />} />
        

        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}