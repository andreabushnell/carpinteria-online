import UserDropdown from "@/components/store/nav/UserMenu";
import { Link, Outlet } from "react-router-dom";

export default function StoreLayout() {

    const styles = {
        container: "grid grid-cols-8 grid-rows-[1.5fr_8fr_1fr] min-h-screen w-full",

        header: "grid grid-cols-8 col-span-8 row-start-1 grid-flow-col bg-primary sticky top-0",
        logo: "grid col-span-1 place-self-center",
        title: "grid col-span-6 place-self-center text-5xl font-bold",
        icons: "grid col-span-1 grid-cols-2",

        main: "grid grid-cols-8 col-span-8 row-start-2 grid-flow-col bg-bg",

        footer: "grid col-span-8 row-start-3 bg-footer place-items-center",
    }

  return (
    <div className={styles.container}>

        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to="/">
                    <img src="logo.png" alt="Logo de Carpintería Online" />
                </Link>
            </div>
            <div className={styles.title}><h1>CARPINTERÍA ONLINE</h1></div>
            <div className={styles.icons}>
              <div className="grid justify-self-end self-center hover:bg-hover transition-colors shadow-sm focus:outline-none overflow-hidden">
                <Link to="/cart">
                <img src="/cart-icon.png" alt="Icono del carrito" className="object-contain p-sm"/>
                </Link>
              </div>
              <div className="grid place-self-center">
                <UserDropdown />
              </div>
            </div>
        </header>

        <main className={styles.main}>
            <Outlet></Outlet>
        </main>

        <footer className={styles.footer}>
            <div className="text-surface">&copy; 2026 Carpintería Online - Desarrollado por Andrea Bushnell</div>
        </footer>

    </div>
  );
}
