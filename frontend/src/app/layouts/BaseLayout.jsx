import { Link, Outlet } from "react-router-dom";

export default function BaseLayout() {

    const styles = {
        container: "grid grid-cols-8 grid-rows-[1.5fr_8fr_1fr] min-h-screen w-full",

        header: "grid grid-cols-6 col-span-8 row-start-1 grid-flow-col bg-primary sticky top-0",
        logo: "grid col-span-1 place-self-center",
        title: "grid col-span-4 place-self-center text-5xl font-bold",
        icons: "grid col-span-1",

        main: "grid grid-cols-8 col-span-8 row-start-2 bg-bg w-full",

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
            <div className={styles.icons}></div>
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
