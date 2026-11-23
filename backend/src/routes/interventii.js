import { Router } from "express";
import { parseId, valideazaInterventie } from "../validation.js";

const router = Router();

// Etapa 9: datele stau în memorie și se pierd la repornire (Etapa 10 le mută în MariaDB)
let interventii = [
  { id: 1, titlu: "Scurgere țeavă baie principală", rezolvata: false, prioritate: "mare", categorie: "Instalații sanitare", descriere: "Clientul semnalează apă sub cadă; țeava de scurgere pare fisurată la îmbinare." },
  { id: 2, titlu: "Verificare anuală centrală termică", rezolvata: true, prioritate: "medie", categorie: "Întreținere", descriere: "Revizie anuală obligatorie: curățare arzător, verificare presiune și etanșeitate." },
  { id: 3, titlu: "Înlocuire robinet calorifer", rezolvata: false, prioritate: "mica", categorie: "Instalații termice", descriere: "Robinetul termostatat din sufragerie nu mai închide complet." },
  { id: 4, titlu: "Desfundare scurgere chiuvetă bucătărie", rezolvata: false, prioritate: "medie", categorie: "Instalații sanitare", descriere: "Apa se scurge foarte greu; posibil depuneri de grăsime în sifon." },
  { id: 5, titlu: "Aerisire calorifere dormitor", rezolvata: true, prioritate: "mica", categorie: "Instalații termice", descriere: "Caloriferele se încălzesc doar jos; aerisire și verificare presiune." },
  { id: 6, titlu: "Fără apă caldă la centrală", rezolvata: false, prioritate: "mare", categorie: "Instalații termice", descriere: "Centrala pornește pe încălzire, dar nu livrează apă caldă menajeră." },
];
let nextId = 7;

// Validează :id și găsește elementul, sau răspunde cu 400 / 404
function gasesteIndex(req, res) {
  const id = parseId(req.params.id);
  if (!id) {
    res.status(400).json({ error: "Id invalid" });
    return -1;
  }
  const index = interventii.findIndex((t) => t.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Intervenția nu există" });
  }
  return index;
}

// GET /interventii
router.get("/", (req, res) => {
  res.json(interventii);
});

// GET /interventii/:id
router.get("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  res.json(interventii[index]);
});

// POST /interventii
router.post("/", (req, res) => {
  const { erori, date } = valideazaInterventie(req.body ?? {});
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }
  const interventie = { id: nextId++, ...date };
  interventii.push(interventie);
  res.status(201).json(interventie);
});

// PATCH /interventii/:id (modificare parțială)
router.patch("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  const { erori, date } = valideazaInterventie(req.body ?? {}, { partial: true });
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }
  interventii[index] = { ...interventii[index], ...date };
  res.json(interventii[index]);
});

// DELETE /interventii/:id
router.delete("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  interventii.splice(index, 1);
  res.status(204).end();
});

export default router;
