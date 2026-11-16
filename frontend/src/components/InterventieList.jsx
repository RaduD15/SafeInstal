import InterventieCard from "./InterventieCard.jsx";
import styles from "./InterventieList.module.css";

export default function InterventieList({ interventii, onToggle, onDelete }) {
  if (interventii.length === 0) {
    return (
      <p className="empty" data-testid="empty">
        <span className="empty-icon" aria-hidden="true">✓</span>
        Nu există nicio intervenție.
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {interventii.map((interventie) => (
        <InterventieCard
          key={interventie.id}
          interventie={interventie}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
