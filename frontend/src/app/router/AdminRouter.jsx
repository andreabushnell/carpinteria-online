import { Routes, Route, Navigate } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import AdminSidebar from "../../components/admin/nav/AdminSidebar";
import DashboardPanel from "../../components/admin/panels/DashboardPanel";

import OrdersListPanel from "../../components/admin/panels/OrdersListPanel";
import OrderDetailPanel from "../../components/admin/panels/OrderDetailPanel";

import CategoriesListPanel from "../../components/admin/panels/CategoriesListPanel";
import CategoryDetailPanel from "../../components/admin/panels/CategoryDetailPanel";

import ProductsListPanel from "../../components/admin/panels/ProductsListPanel";
import ProductDetailPanel from "../../components/admin/panels/ProductDetailPanel";

import UsersListPanel from "../../components/admin/panels/UsersListPanel";
import UserDetailPanel from "../../components/admin/panels/UserDetailPanel";

export default function AdminRouter() {
    return (
        <Routes>
            <Route element={<BaseLayout />}>
                <Route
                    path="/login"
                    element={<Navigate to="/admin" replace />}
                />
                <Route
                    path="/register"
                    element={<Navigate to="/admin" replace />}
                />

                <Route path="/admin" element={<AdminSidebar />}>
                    <Route index element={<DashboardPanel />} />
                    <Route
                        path="/admin/orders/list"
                        element={<OrdersListPanel />}
                    />
                    <Route
                        path="/admin/orders/detail"
                        element={<OrderDetailPanel />}
                    />
                    <Route
                        path="/admin/categories/list"
                        element={<CategoriesListPanel />}
                    />
                    <Route
                        path="/admin/categories/detail"
                        element={<CategoryDetailPanel />}
                    />
                    <Route
                        path="/admin/products/list"
                        element={<ProductsListPanel />}
                    />
                    <Route
                        path="/admin/products/detail"
                        element={<ProductDetailPanel />}
                    />
                    <Route
                        path="/admin/users/list"
                        element={<UsersListPanel />}
                    />
                    <Route
                        path="/admin/users/detail"
                        element={<UserDetailPanel />}
                    />
                </Route>

                <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>
        </Routes>
    );
}
