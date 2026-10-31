import { useState } from "react";
import InterventieList from "./components/InterventieList.jsx";

const INTERVENTII_INITIALE = [
  { id: 1, titlu: "Scurgere țeavă baie principală", rezolvata: false, prioritate: "mare" },
  { id: 2, titlu: "Verificare anuală centrală termică", rezolvata: true, prioritate: "medie" },
  { id: 3, titlu: "Înlocuire robinet calorifer", rezolvata: false, prioritate: "mica" }
];

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [interventii, setInterventii] = useState(INTERVENTII_INITIALE);
  const [tema, setTema] = useState(temaInitiala);

  function handleToggle(id) {
    setInterventii((prev) =>
      prev.map((t) => (t.id === id ? { ...t, rezolvata: !t.rezolvata } : t))
    );
  }

  function handleDelete(id) {
    setInterventii((prev) => prev.filter((t) => t.id !== id));
  }

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  const nerezolvate = interventii.filter((t) => !t.rezolvata).length;
  const procent = interventii.length === 0
    ? 0
    : Math.round(((interventii.length - nerezolvate) / interventii.length) * 100);

  return (
    <>
      <header className="app-header">
        <div className="header-inner">
          <div className="header-top">
            <div className="brand">
              <span className="brand-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path d="M12 2.5c3.6 4.4 6.5 8 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10.5 8.4 6.9 12 2.5Z" fill="currentColor" />
                </svg>
              </span>
              <h1>SafeInstal</h1>
            </div>
            <button
              className="theme-toggle"
              onClick={handleTema}
              aria-pressed={tema === "dark"}
            >
              <span aria-hidden="true">{tema === "dark" ? "☀" : "☾"}</span>
              {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
            </button>
          </div>
          <p className="tagline">Gestionează eficient problemele și intervențiile clienților.</p>
          <div className="pipe">
            <div className="pipe-labels">
              <p className="app-count">
                {interventii.length} intervenții, dintre care {nerezolvate} nerezolvate
              </p>
              <span className="pipe-value">{procent}% rezolvate</span>
            </div>
            <div
              className="pipe-track"
              role="progressbar"
              aria-label="Intervenții rezolvate"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={procent}
            >
              <div className="pipe-fill" style={{ width: `${procent}%` }} />
            </div>
          </div>
        </div>
      </header>
      <main className="container">
        <section className="panel">
          <div className="panel-head">
            <h2>Intervențiile clienților</h2>
            <span className="panel-pill">{nerezolvate} active</span>
          </div>
          <InterventieList
            interventii={interventii}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </section>
      </main>
      <footer className="app-footer">Proiect Tehnologii Web · SafeInstal</footer>
    </>
  );
}
