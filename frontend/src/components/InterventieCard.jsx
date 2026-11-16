import { Link } from "react-router-dom";
import { ETICHETE_PRIORITATE } from "../constants.js";
import styles from "./InterventieCard.module.css";

export default function InterventieCard({ interventie, onToggle, onDelete }) {
  const clase = [
    styles.card,
    styles[`prio-${interventie.prioritate}`],
    interventie.rezolvata && styles.done,
  ].filter(Boolean).join(" ");

  return (
    <li className={clase} data-testid="item" data-id={interventie.id}>
      <div className={styles.main}>
        <input
          type="checkbox"
          checked={interventie.rezolvata}
          onChange={() => onToggle(interventie.id)}
          aria-label={`Marchează ${interventie.titlu}`}
          data-testid="item-toggle"
        />
        <div>
          <span className={styles.code}>INT-{String(interventie.id).padStart(3, "0")}</span>
          <h3 className={styles.title}>
            <Link to={`/interventii/${interventie.id}`} data-testid="item-link">
              {interventie.titlu}
            </Link>
          </h3>
          <div className={styles.meta}>
            <span className={`badge badge-${interventie.prioritate}`}>
              Prioritate {ETICHETE_PRIORITATE[interventie.prioritate]?.toLowerCase()}
            </span>
            <span className={styles.status}>{interventie.rezolvata ? "Rezolvată" : "În lucru"}</span>
          </div>
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
    </li>
  );
}
