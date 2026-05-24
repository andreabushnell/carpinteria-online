import { Routes, Route, Navigate } from "react-router-dom";

import StoreLayout from "../layouts/StoreLayout";
import HomePage from "../../pages/store/HomePage";
import ProductDetailPage from "../../pages/store/ProductDetailPage";
import CartPage from "../../pages/store/CartPage";
import CheckoutPage from "../../pages/store/CheckoutPage";
import OrderSuccessPage from "../../pages/store/OrderSuccessPage";
import StoreOrdersPage from "../../pages/store/OrdersPage";
import StoreOrderDetailPage from "../../pages/store/OrderDetailPage";
import ProfilePage from "../../pages/store/ProfilePage";

export default function StoreRouter() {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/orders" element={<StoreOrdersPage />} />
        <Route path="/orders/:id" element={<StoreOrderDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}