import InterventieList from "./Components/InterventieList.jsx";const interventii = [
  { id: 1, titlu: "Scurgere țeavă baie principală", rezolvata: false, prioritate: "mare" },
  { id: 2, titlu: "Verificare anuală centrală termică", rezolvata: true, prioritate: "medie" },
  { id: 3, titlu: "Înlocuire robinet calorifer", rezolvata: false, prioritate: "mica" }
];

export default function App() {
  const nerezolvate = interventii.filter((t) => !t.rezolvata).length;

  return (
    <>
      <header className="app-header">
        <h1>QuickInstal</h1>
        <p>Gestionează eficient problemele și intervențiile clienților.</p>
        <p className="app-count">
          {interventii.length} intervenții, dintre care {nerezolvate} nerezolvate
        </p>
      </header>
      <main className="container">
        <section className="panel">
          <h2>Intervențiile clienților</h2>
          
          {/* Trimitem array-ul către componenta copil */}
          <InterventieList interventii={interventii} />
        </section>
      </main>
    </>
  );
}