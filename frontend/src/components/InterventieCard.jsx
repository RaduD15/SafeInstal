const ETICHETE_PRIORITATE = {
  mica: "Prioritate mică",
  medie: "Prioritate medie",
  mare: "Prioritate mare"
};

export default function InterventieCard({ interventie, onToggle, onDelete }) {
  const clase = `item-card prio-${interventie.prioritate}${interventie.rezolvata ? " done" : ""}`;

  return (
    <li className={clase} data-testid="item" data-id={interventie.id}>
      <label className="item-main">
        <input
          type="checkbox"
          checked={interventie.rezolvata}
          onChange={() => onToggle(interventie.id)}
          data-testid="item-toggle"
        />
        <div>
          <span className="item-code">INT-{String(interventie.id).padStart(3, "0")}</span>
          <h3 data-testid="item-title">{interventie.titlu}</h3>
          <div className="item-meta">
            <span className={`badge badge-${interventie.prioritate}`}>
              {ETICHETE_PRIORITATE[interventie.prioritate]}
            </span>
            <span className="status">{interventie.rezolvata ? "Rezolvată" : "În lucru"}</span>
          </div>
        </div>
      </label>
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
