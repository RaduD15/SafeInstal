const ETICHETE_PRIORITATE = { 
  mica: "Prioritate mică", 
  medie: "Prioritate medie", 
  mare: "Prioritate mare" 
};

export default function InterventieCard({ interventie }) {
  return (
    <li className={interventie.rezolvata ? "item-card done" : "item-card"}>
      <div>
        <h3>{interventie.titlu}</h3>
        {}
        <span className={`badge badge-${interventie.prioritate}`}>
          {ETICHETE_PRIORITATE[interventie.prioritate]}
        </span>
      </div>
      {}
      <span className="status">{interventie.rezolvata ? "Rezolvată" : "Nerezolvată"}</span>
    </li>
  );
}