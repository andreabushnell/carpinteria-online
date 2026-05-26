import UserDropdown from "@/components/store/nav/UserMenu";
import { Link, Outlet } from "react-router-dom";
import LogoSvg from '../../assets/logoSvg.svg?react';

export default function StoreLayout() {
    const styles = {
        container: "grid grid-cols-8 grid-rows-[2fr_20fr_1fr] min-h-screen w-full",

        header: "grid grid-cols-8 col-span-8 row-start-1 grid-flow-col bg-primary sticky top-0 z-50",
        logo: "grid col-span-1 place-self-center",
        title: "grid col-span-6 place-self-center",
        
        icons: "grid col-span-1 grid-cols-2 m-lg p-md overflow-visible",

        main: "grid grid-cols-8 col-span-8 row-start-2 bg-bg w-full",

        footer: "grid col-span-8 row-start-3 bg-footer place-items-center",
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logo}></div>
                
                <div className={styles.title}>
                    <Link to="/" className="flex items-center justify-center">
                        <LogoSvg className="h-full w-full" />
                    </Link>
                </div>
                
                <div className={styles.icons}>
                    <div className="grid place-self-center h-full w-auto place-items-center bg-white p-sm shadow-xl/30 rounded-sm relative z-10">
                        <Link 
                            to="/cart" 
                            className="w-10 h-10 flex items-center justify-center hover:bg-hover transition-colors overflow-hidden"
                        >
                            <img 
                                src="/cart-icon.png" 
                                alt="Icono del carrito" 
                                className="w-full h-full object-contain p-xs"
                            />
                        </Link>
                    </div>

                    <div className="grid place-self-center h-full w-auto place-items-center bg-white p-sm shadow-xl/30 rounded-sm relative z-10">
                        <UserDropdown />
                    </div>
                </div>
            </header>

            <main className={styles.main}>
                <Outlet />
            </main>

            <footer className={styles.footer}>
                <div className="text-surface">
                    &copy; 2026 Carpintería Online - Desarrollado por Andrea Bushnell
                </div>
            </footer>
        </div>
    );
}