import { useState } from "react";
import InterventieList from "./Components/InterventieList.jsx";

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

  return (
    <>
      <header className="app-header">
        <button
          className="theme-toggle"
          onClick={handleTema}
          aria-pressed={tema === "dark"}
        >
          {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
        </button>
        <h1>QuickInstal</h1>
        <p>Gestionează eficient problemele și intervențiile clienților.</p>
        <p className="app-count">
          {interventii.length} intervenții, dintre care {nerezolvate} nerezolvate
        </p>
      </header>
      <main className="container">
        <section className="panel">
          <h2>Intervențiile clienților</h2>
          
          <InterventieList 
            interventii={interventii} 
            onToggle={handleToggle} 
            onDelete={handleDelete} 
          />
        </section>
      </main>
    </>
  );
}