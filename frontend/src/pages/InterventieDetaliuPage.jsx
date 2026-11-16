import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchInterventie } from "../api.js";
import { ETICHETE_PRIORITATE } from "../constants.js";
import styles from "./InterventieDetaliuPage.module.css";

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
      <section className="panel">
        <p className="info" data-testid="loading">
          Se încarcă intervenția...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`panel ${styles.detail}`}>
        <p className="error" role="alert" data-testid="error">
          Intervenția nu a putut fi încărcată: {error}
        </p>
        <Link to="/">Înapoi la listă</Link>
      </section>
    );
  }

  return (
    <section className={`panel ${styles.detail}`} data-testid="detail">
      <Link to="/" className={styles.back}>
        ← Înapoi la listă
      </Link>
      <span className={styles.code}>INT-{String(interventie.id).padStart(3, "0")}</span>
      <h2
        className={interventie.rezolvata ? `${styles.title} ${styles.done}` : styles.title}
        data-testid="detail-title"
      >
        {interventie.titlu}
      </h2>
      <dl className={styles.fields}>
        <dt>Prioritate</dt>
        <dd>
          <span className={`badge badge-${interventie.prioritate}`}>
            {ETICHETE_PRIORITATE[interventie.prioritate]}
          </span>
        </dd>
        <dt>Status</dt>
        <dd>{interventie.rezolvata ? "Rezolvată" : "În lucru"}</dd>
        <dt>Categorie</dt>
        <dd>{interventie.categorie ?? "—"}</dd>
        <dt>Descriere</dt>
        <dd>{interventie.descriere ?? "—"}</dd>
        <dt>ID</dt>
        <dd>{interventie.id}</dd>
      </dl>
    </section>
  );
}
