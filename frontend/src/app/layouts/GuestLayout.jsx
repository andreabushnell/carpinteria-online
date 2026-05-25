import GuestDropdown from "@/components/guest/nav/GuestMenu";
import { Link, Outlet } from "react-router-dom";
import LogoSvg from '../../assets/logoSvg.svg?react';

export default function GuestLayout() {

    const styles = {
        container: "grid grid-cols-8 grid-rows-[1.5fr_8fr_1fr] min-h-screen w-full",

        header: "grid grid-cols-8 col-span-8 row-start-1 grid-flow-col bg-primary sticky top-0",
        logo: "grid col-span-1 place-self-center",
        title: "grid col-span-6 place-self-center",
        icons: "grid col-span-1 grid-cols-2 m-lg p-md",

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
              <div className="grid justify-self-end self-center hover:bg-hover transition-colors shadow-sm focus:outline-none overflow-hidden">
              </div>
              <div className="grid place-self-center h-full w-full border place-items-center">
                <GuestDropdown />
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