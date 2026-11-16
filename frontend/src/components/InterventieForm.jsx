import { useState } from "react";
import { PRIORITATI } from "../constants.js";
import styles from "./InterventieForm.module.css";

const TITLU_MAX = 100;

// Formular controlat: state-ul React este sursa de adevăr pentru câmpuri
export default function InterventieForm({ onAdd }) {
  const [titlu, setTitlu] = useState("");
  const [prioritate, setPrioritate] = useState("medie");
  const [eroare, setEroare] = useState("");
  const [trimite, setTrimite] = useState(false);

  function valideaza() {
    const t = titlu.trim();
    if (t === "") return "Titlul este obligatoriu.";
    if (t.length > TITLU_MAX) return `Titlul are maximum ${TITLU_MAX} de caractere.`;
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault(); // oprește reîncărcarea paginii
    const mesaj = valideaza();
    if (mesaj) {
      setEroare(mesaj);
      return;
    }
    setEroare("");
    setTrimite(true);
    try {
      await onAdd({ titlu: titlu.trim(), prioritate, rezolvata: false });
      setTitlu("");
      setPrioritate("medie");
    } catch (err) {
      setEroare(err.message);
    } finally {
      setTrimite(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate data-testid="form">
      <label>
        Titlu
        <input
          type="text"
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
          placeholder="Ex: Scurgere țeavă baie"
          maxLength={TITLU_MAX}
          aria-invalid={Boolean(eroare)}
          data-testid="form-title"
        />
      </label>
      <label>
        Prioritate
        <select
          value={prioritate}
          onChange={(e) => setPrioritate(e.target.value)}
          data-testid="form-prioritate"
        >
          {PRIORITATI.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </label>
      {eroare && (
        <p className="error" data-testid="form-error">
          {eroare}
        </p>
      )}
      <button type="submit" className="btn" disabled={trimite} data-testid="form-submit">
        {trimite ? "Se salvează..." : "Adaugă intervenția"}
      </button>
    </form>
  );
}
