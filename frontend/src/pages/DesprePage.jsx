import styles from "./DesprePage.module.css";

const STACK = ["React", "Vite", "React Router", "Node.js", "Express", "MariaDB", "Docker"];

// Pagina de prezentare, cu textul din README
export default function DesprePage() {
  return (
    <section className={styles.about}>
      <p className={styles.eyebrow}>Despre SafeInstal</p>
      <h1 className={styles.headline}>
        Instalații sanitare și termice.
        <br />
        <span className="gradient-text">Gestionate simplu.</span>
      </h1>
      <p className={styles.lead}>
        SafeInstal este o aplicație web care gestionează eficient problemele și
        intervențiile de instalații sanitare și termice pentru clienții unei firme
        de service. Este construită pas cu pas, pe parcursul semestrului, în cadrul
        proiectului de Tehnologii Web.
      </p>
      <h2 className={styles.stackTitle}>Construită cu</h2>
      <ul className={styles.stack}>
        {STACK.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </section>
  );
}
