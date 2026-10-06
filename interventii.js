// 1. Datele de test și valorile permise
const interventii = [
  { id: 1, titlu: "Scurgere țeavă baie principală", rezolvata: false, prioritate: "mare" },
  { id: 2, titlu: "Verificare anuală centrală termică", rezolvata: true, prioritate: "medie" },
  { id: 3, titlu: "Înlocuire robinet calorifer", rezolvata: false, prioritate: "mica" }
];

const PRIORITATI = ["mica", "medie", "mare"];

// 2. Listarea titlurilor (folosind map)
function listeazaTitluri(lista) {
  return lista.map((t) => t.titlu);
}

// 3. Numărarea elementelor nerezolvate (folosind filter)
function numaraNerezolvate(lista) {
  return lista.filter((t) => !t.rezolvata).length;
}

// 4. Căutarea după titlu 
function cautaDupaTitlu(lista, text) {
  return lista.filter((t) => t.titlu.toLowerCase().includes(text.toLowerCase()));
}

// 5. Calculul noului ID
function nextId(lista) {
  return lista.reduce((max, t) => Math.max(max, t.id), 0) + 1;
}

// 6. Adăugarea unei intervenții cu validare
function adaugaInterventie(lista, titlu, prioritate = "medie") {
  const titluCurat = titlu.trim();
  
  if (titluCurat === "") {
    console.log("Eroare: Titlul nu poate fi gol.");
    return lista;
  }
  
  if (!PRIORITATI.includes(prioritate)) {
    console.log("Eroare: Prioritate invalidă:", prioritate);
    return lista;
  }
  
  const nou = {
    id: nextId(lista),
    titlu: titluCurat,
    rezolvata: false,
    prioritate: prioritate
  };
  
  return [...lista, nou];
}

// 7. Comutarea stării rezolvat/nerezolvat
function comutaRezolvata(lista, id) {
  return lista.map((t) => {
    if (t.id === id) {
      return { ...t, rezolvata: !t.rezolvata };
    }
    return t;
  });
}

// 8. Ștergerea unei intervenții
function stergeInterventie(lista, id) {
  return lista.filter((t) => t.id !== id);
}

// TESTE
console.log("--- Citire ---");
console.log("Titluri:", listeazaTitluri(interventii).join(", "));
console.log("Nerezolvate:", numaraNerezolvate(interventii));
console.log("Căutare 'țeavă':", listeazaTitluri(cautaDupaTitlu(interventii, "țeavă")).join(", "));

console.log("--- Adăugare ---");
let listaNoua = adaugaInterventie(interventii, "Instalare masina de spalat", "medie");
console.log("Lista nouă:", listaNoua.length, "intervenții");
console.log("Originalul a rămas cu:", interventii.length, "intervenții"); // Demonstrează imutabilitatea

console.log("--- Modificare și ștergere ---");
listaNoua = comutaRezolvata(listaNoua, 1);
console.log("După bifarea ID 1, nerezolvate:", numaraNerezolvate(listaNoua));

listaNoua = stergeInterventie(listaNoua, 3);
console.log("După ștergerea ID 3:", listeazaTitluri(listaNoua).join(", "));

console.log("--- Validare ---");
adaugaInterventie(listaNoua, "   ", "mica");
adaugaInterventie(listaNoua, "Test", "urgenta");