import InterventieCard from "./InterventieCard.jsx";

export default function InterventieList({ interventii, onToggle, onDelete }) {
  if (interventii.length === 0) {
    return (
      <p className="empty">
        <span className="empty-icon" aria-hidden="true">✓</span>
        Nu există nicio intervenție.
      </p>
    );
  }

  return (
    <ul className="item-list">
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
