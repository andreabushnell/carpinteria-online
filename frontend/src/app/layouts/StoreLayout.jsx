import { Outlet } from "react-router-dom";

import Header from "../../components/layout/header/Header";
import Navigation from "../../components/layout/header/Navigation";
import Footer from "../../components/layout/footer/Footer";

export default function StoreLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      
      <Header />

      <Navigation />

      <main className="flex-1 px-lg py-lg">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}