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
  const rezolvate = interventii.length - nerezolvate;
  const urgente = interventii.filter((t) => !t.rezolvata && t.prioritate === "mare").length;
  const procent = interventii.length === 0 ? 0 : Math.round((rezolvate / interventii.length) * 100);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>Panou de intervenții</p>
          <h1 className={styles.headline}>
            Fiecare țeavă.
            <br />
            <span className="gradient-text">Sub control.</span>
          </h1>
          <p className={styles.lead}>
            {interventii.length} intervenții, dintre care {nerezolvate} nerezolvate.
          </p>
        </div>

        <div className={styles.stats}>
          {/* Inel de progres: pathLength="100" face din procent direct lungimea liniei */}
          <div
            className={styles.ring}
            role="progressbar"
            aria-label="Intervenții rezolvate"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={procent}
          >
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" className={styles.stopStart} />
                  <stop offset="100%" className={styles.stopEnd} />
                </linearGradient>
              </defs>
              <circle className={styles.ringTrack} cx="60" cy="60" r="50" />
              <circle
                className={styles.ringValue}
                cx="60"
                cy="60"
                r="50"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={100 - procent}
              />
            </svg>
            <div className={styles.ringLabel}>
              <strong>{procent}%</strong>
              <span>rezolvate</span>
            </div>
          </div>
          <dl className={styles.numbers}>
            <div>
              <dt>Active</dt>
              <dd>{nerezolvate}</dd>
            </div>
            <div>
              <dt>Urgente</dt>
              <dd className={styles.urgent}>{urgente}</dd>
            </div>
            <div>
              <dt>Rezolvate</dt>
              <dd>{rezolvate}</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className={styles.grid}>
        <section className={`panel ${styles.formPanel}`}>
          <div className="panel-head">
            <h2>Intervenție nouă</h2>
          </div>
          <InterventieForm onAdd={handleAdd} />
        </section>

        <section className={`panel ${styles.listPanel}`}>
          <div className="panel-head">
            <h2>Toate intervențiile</h2>
            <span className="panel-pill">{nerezolvate} active</span>
          </div>
          {loading && (
            <p className="info loading" data-testid="loading">
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
    </>
  );
}
