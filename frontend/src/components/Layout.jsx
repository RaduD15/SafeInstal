import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// NavLink marchează singur pagina curentă
function navClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

// Antetul, navigația și subsolul, comune tuturor paginilor
export default function Layout() {
  const [tema, setTema] = useState(temaInitiala);

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.top}>
            <div className={styles.brand}>
              <span className={styles.mark} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path d="M12 2.5c3.6 4.4 6.5 8 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10.5 8.4 6.9 12 2.5Z" fill="currentColor" />
                </svg>
              </span>
              <span className={styles.logo}>SafeInstal</span>
            </div>
            <div className={styles.actions}>
              <nav className={styles.nav} data-testid="nav">
                <NavLink to="/" end className={navClass}>
                  Intervenții
                </NavLink>
                <NavLink to="/despre" className={navClass}>
                  Despre
                </NavLink>
              </nav>
              <button
                className={styles.themeToggle}
                onClick={handleTema}
                aria-pressed={tema === "dark"}
              >
                <span aria-hidden="true">{tema === "dark" ? "☀" : "☾"}</span>
                {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
              </button>
            </div>
          </div>
          <p className={styles.tagline}>Gestionează eficient problemele și intervențiile clienților.</p>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>Proiect Tehnologii Web · SafeInstal</footer>
    </>
  );
}
