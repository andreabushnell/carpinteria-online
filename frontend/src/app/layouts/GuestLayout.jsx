import GuestDropdown from "@/components/guest/nav/GuestMenu";
import { Link, Outlet } from "react-router-dom";
import LogoSvg from '../../assets/logoSvg.svg?react';
import SubNavbar from '../../components/store/nav/SubNavbar';

export default function GuestLayout() {
    const styles = {
        container: "grid grid-cols-8 grid-rows-[auto_20fr_1fr] min-h-screen w-full", 

        header: "col-span-8 row-start-1 flex flex-col bg-primary sticky top-0 z-50",
        
        headerTop: "grid grid-cols-8 grid-flow-col w-full items-center",
        logo: "grid col-span-1 place-self-center",
        title: "grid col-span-6 place-self-center",
        icons: "grid col-span-1 grid-cols-2 m-lg p-md overflow-visible",

        main: "grid grid-cols-8 col-span-8 row-start-2 bg-bg w-full",
        footer: "grid col-span-8 row-start-3 bg-footer place-items-center",
    }

  return (
    <div className={styles.container}>

        <header className={styles.header}>
            <div className={styles.headerTop}>
                <div className={styles.logo}></div>
                
                <div className={styles.title}>
                    <Link to="/" className="flex items-center justify-center">
                        <LogoSvg className="h-full w-full" />
                    </Link>
                </div>
                
                <div className={styles.icons}>
                    <div className="grid justify-self-end self-center"></div>
                    <div className="grid place-self-center h-full w-auto place-items-center bg-white p-sm shadow-xl/30 rounded-sm relative z-10">
                        <GuestDropdown />
                    </div>
                </div>
            </div>

            <SubNavbar />
        </header>
            
        <main className={styles.main}>
            <Outlet />
        </main>

        <footer className={styles.footer}>
            <div className="text-surface">&copy; 2026 Carpintería Online - Desarrollado por Andrea Bushnell</div>
        </footer>

    </div>
  );
}