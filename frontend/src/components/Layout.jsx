import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
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
    const aplica = () => {
      setTema(noua);
      document.documentElement.dataset.theme = noua;
    };
    // Schimbarea temei se animă cu View Transitions, unde browserul le are
    if (document.startViewTransition) document.startViewTransition(aplica);
    else aplica();
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link to="/" viewTransition className={styles.brand} aria-label="SafeInstal, pagina principală">
            <span className={styles.mark} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path d="M12 2.5c3.6 4.4 6.5 8 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10.5 8.4 6.9 12 2.5Z" fill="currentColor" />
              </svg>
            </span>
            SafeInstal
          </Link>
          <div className={styles.actions}>
            <nav className={styles.nav} data-testid="nav">
              <NavLink to="/" end viewTransition className={navClass}>
                Intervenții
              </NavLink>
              <NavLink to="/despre" viewTransition className={navClass}>
                Despre
              </NavLink>
            </nav>
            <button
              className={styles.themeToggle}
              onClick={handleTema}
              aria-pressed={tema === "dark"}
              aria-label="Mod întunecat"
              title={tema === "dark" ? "Mod luminos" : "Mod întunecat"}
            >
              {/* key: iconița se remontează și rulează animația la fiecare schimbare */}
              <svg key={tema} className={styles.icon} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                {tema === "dark" ? (
                  <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="4.5" fill="currentColor" />
                    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                  </g>
                ) : (
                  <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" fill="currentColor" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span>Proiect Tehnologii Web</span>
          <span>SafeInstal</span>
        </div>
      </footer>
    </>
  );
}
