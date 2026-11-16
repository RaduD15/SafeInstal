import { useEffect, useState } from "react";
import InterventieList from "../components/InterventieList.jsx";
import InterventieForm from "../components/InterventieForm.jsx";
import {
  createInterventie,
  deleteInterventie,
  fetchInterventii,
  updateInterventie,
} from "../api.js";
import styles from "./InterventiiPage.module.css";

export default function InterventiiPage() {
  const [interventii, setInterventii] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Rulează o singură dată, după prima randare
  useEffect(() => {
    let ignore = false; // nu se setează state dacă componenta a dispărut între timp

    async function load() {
      try {
        const data = await fetchInterventii();
        if (!ignore) setInterventii(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  // Întâi serverul, apoi state-ul: pe ecran ajunge doar ce s-a salvat
  async function handleAdd(interventie) {
    const creata = await createInterventie(interventie); // serverul întoarce elementul cu id
    setInterventii((prev) => [...prev, creata]);
  }

  async function handleToggle(id) {
    const interventie = interventii.find((t) => t.id === id);
    try {
      const actualizata = await updateInterventie(id, { rezolvata: !interventie.rezolvata });
      setInterventii((prev) => prev.map((t) => (t.id === id ? actualizata : t)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteInterventie(id);
      setInterventii((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const nerezolvate = interventii.filter((t) => !t.rezolvata).length;
  const procent = interventii.length === 0
    ? 0
    : Math.round(((interventii.length - nerezolvate) / interventii.length) * 100);

  return (
    <div className={styles.grid}>
      <section className="panel">
        <div className="panel-head">
          <h2>Adaugă intervenție</h2>
        </div>
        <InterventieForm onAdd={handleAdd} />
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Intervențiile clienților</h2>
          <span className="panel-pill">{nerezolvate} active</span>
        </div>
        {/* Contorul, mutat din antet: antetul este comun tuturor paginilor */}
        <div className={styles.pipe}>
          <div className={styles.pipeLabels}>
            <p className={styles.summary}>
              {interventii.length} intervenții, dintre care {nerezolvate} nerezolvate
            </p>
            <span className={styles.pipeValue}>{procent}% rezolvate</span>
          </div>
          <div
            className={styles.pipeTrack}
            role="progressbar"
            aria-label="Intervenții rezolvate"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={procent}
          >
            <div className={styles.pipeFill} style={{ width: `${procent}%` }} />
          </div>
        </div>
        {loading && (
          <p className="info" data-testid="loading">
            Se încarcă intervențiile...
          </p>
        )}
        {error && (
          <p className="error" role="alert" data-testid="error">
            {error}
          </p>
        )}
        {!loading && (
          <InterventieList
            interventii={interventii}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        )}
      </section>
    </div>
  );
}
