// Validare pe server: datele de la client nu sunt niciodată de încredere.
// Valorile trebuie să fie identice cu PRIORITATI din frontend/src/constants.js
export const PRIORITATI = ["mica", "medie", "mare"];
const TITLU_MAX = 100;
const CATEGORIE_MAX = 50;
const DESCRIERE_MAX = 500;

// Câmp text opțional (categorie, descriere): dacă e trimis, trebuie să fie text, cu lungime limitată
function textOptional(body, camp, max, erori, date) {
  if (body[camp] === undefined) return;
  if (typeof body[camp] !== "string") {
    erori.push(`${camp} trebuie să fie text`);
  } else if (body[camp].trim().length > max) {
    erori.push(`${camp} are maximum ${max} de caractere`);
  } else {
    date[camp] = body[camp].trim();
  }
}

// partial = true pentru PATCH (se verifică doar câmpurile trimise)
export function valideazaInterventie(body, { partial = false } = {}) {
  const erori = [];
  const date = {};

  if (!partial || body.titlu !== undefined) {
    if (typeof body.titlu !== "string" || body.titlu.trim() === "") {
      erori.push("titlu este obligatoriu");
    } else if (body.titlu.trim().length > TITLU_MAX) {
      erori.push(`titlu are maximum ${TITLU_MAX} de caractere`);
    } else {
      date.titlu = body.titlu.trim();
    }
  }

  if (!partial || body.prioritate !== undefined) {
    const p = body.prioritate ?? "medie";
    if (!PRIORITATI.includes(p)) {
      erori.push(`prioritate trebuie să fie una din: ${PRIORITATI.join(", ")}`);
    } else {
      date.prioritate = p;
    }
  }

  if (body.rezolvata !== undefined) {
    if (typeof body.rezolvata !== "boolean") {
      erori.push("rezolvata trebuie să fie true sau false");
    } else {
      date.rezolvata = body.rezolvata;
    }
  } else if (!partial) {
    date.rezolvata = false;
  }

  textOptional(body, "categorie", CATEGORIE_MAX, erori, date);
  textOptional(body, "descriere", DESCRIERE_MAX, erori, date);

  // Orice alt câmp trimis (id, user_id...) nu ajunge în `date`: listă albă
  return { erori, date };
}

// Id-urile din adresă vin ca text; se acceptă doar numere întregi pozitive
export function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}
