import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchInterventie } from "../api.js";
import { ETICHETE_PRIORITATE } from "../constants.js";
import styles from "./InterventieDetaliuPage.module.css";

function Inapoi() {
  return (
    <Link to="/" viewTransition className={styles.back}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="m15 6-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Înapoi la listă
    </Link>
  );
}

export default function InterventieDetaliuPage() {
  const { id } = useParams(); // text din URL, de exemplu "3"
  const [interventie, setInterventie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Se reîncarcă dacă se schimbă id-ul din adresă
  useEffect(() => {
    let ignore = false;

    fetchInterventie(id)
      .then((data) => {
        if (!ignore) {
          setInterventie(data);
          setError(null); // o eroare de la un id anterior nu mai este valabilă
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className={styles.detail}>
        <p className="info loading" data-testid="loading">
          Se încarcă intervenția...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.detail}>
        <Inapoi />
        <section className="panel">
          <h1 className={styles.errorTitle}>Intervenția nu a fost găsită.</h1>
          <p className="error" role="alert" data-testid="error">
            Intervenția nu a putut fi încărcată: {error}
          </p>
        </section>
      </div>
    );
  }

  return (
    <article className={styles.detail} data-testid="detail">
      <Inapoi />

      <header className={styles.head}>
        <p className={styles.eyebrow}>
          INT-{String(interventie.id).padStart(3, "0")}
          {interventie.categorie && ` · ${interventie.categorie}`}
        </p>
        <h1
          className={interventie.rezolvata ? `${styles.title} ${styles.done}` : styles.title}
          data-testid="detail-title"
        >
          {interventie.titlu}
        </h1>
        <div className={styles.tags}>
          <span className={`badge badge-${interventie.prioritate}`}>
            Prioritate {ETICHETE_PRIORITATE[interventie.prioritate]?.toLowerCase()}
          </span>
          <span className={interventie.rezolvata ? `${styles.status} ${styles.resolved}` : styles.status}>
            {interventie.rezolvata ? "Rezolvată" : "În lucru"}
          </span>
        </div>
      </header>

      {interventie.descriere && <p className={styles.description}>{interventie.descriere}</p>}

      <dl className={styles.fields}>
        <div>
          <dt>Categorie</dt>
          <dd>{interventie.categorie ?? "—"}</dd>
        </div>
        <div>
          <dt>Prioritate</dt>
          <dd>{ETICHETE_PRIORITATE[interventie.prioritate]}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{interventie.rezolvata ? "Rezolvată" : "În lucru"}</dd>
        </div>
        <div>
          <dt>ID</dt>
          <dd>{interventie.id}</dd>
        </div>
      </dl>
    </article>
  );
}
