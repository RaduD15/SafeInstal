import { Link } from "react-router-dom";
import { ETICHETE_PRIORITATE } from "../constants.js";
import styles from "./InterventieCard.module.css";

export default function InterventieCard({ interventie, onToggle, onDelete }) {
  const clase = interventie.rezolvata ? `${styles.card} ${styles.done}` : styles.card;

  return (
    <li className={clase} data-testid="item" data-id={interventie.id}>
      <input
        type="checkbox"
        className={styles.check}
        checked={interventie.rezolvata}
        onChange={() => onToggle(interventie.id)}
        aria-label={`Marchează ${interventie.titlu}`}
        data-testid="item-toggle"
      />
      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link to={`/interventii/${interventie.id}`} viewTransition data-testid="item-link">
            {interventie.titlu}
          </Link>
        </h3>
        <div className={styles.meta}>
          <span className={`badge badge-${interventie.prioritate}`}>
            {ETICHETE_PRIORITATE[interventie.prioritate]}
          </span>
          <span>{interventie.rezolvata ? "Rezolvată" : "În lucru"}</span>
          <span className={styles.code}>INT-{String(interventie.id).padStart(3, "0")}</span>
        </div>
      </div>
      <button
        className="btn-danger"
        onClick={() => onDelete(interventie.id)}
        aria-label={`Șterge ${interventie.titlu}`}
        data-testid="item-delete"
      >
        Șterge
      </button>
      <svg className={styles.chevron} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="m9 6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </li>
  );
}
