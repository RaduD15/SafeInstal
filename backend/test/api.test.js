// Testează API-ul ca programul de verificare (tabelul 9.4): rulează cu `npm test`.
// app.js e separat de server.js, deci aplicația pornește aici pe un port liber, ales de sistem.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import app from "../src/app.js";

let server;
let base;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  base = `http://localhost:${server.address().port}`;
});

after(() => server.close());

function cerere(path, method = "GET", body) {
  return fetch(`${base}${path}`, {
    method,
    headers: { "Content-Type": "application/json", Origin: "http://localhost:5173" },
    body: body === undefined ? undefined : typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("S9-R2: GET, POST, GET, PATCH, DELETE, apoi GET dă 404", async () => {
  let res = await cerere("/interventii");
  assert.equal(res.status, 200);
  assert.ok(Array.isArray(await res.json()));

  res = await cerere("/interventii", "POST", { titlu: "Din test", rezolvata: false, prioritate: "mare" });
  assert.equal(res.status, 201);
  const creata = await res.json();
  assert.equal(creata.titlu, "Din test");
  assert.equal(typeof creata.id, "number");

  res = await cerere(`/interventii/${creata.id}`);
  assert.equal(res.status, 200);

  res = await cerere(`/interventii/${creata.id}`, "PATCH", { rezolvata: true });
  assert.equal(res.status, 200);
  assert.equal((await res.json()).rezolvata, true);

  res = await cerere(`/interventii/${creata.id}`, "DELETE");
  assert.equal(res.status, 204);

  res = await cerere(`/interventii/${creata.id}`);
  assert.equal(res.status, 404);
  assert.deepEqual(await res.json(), { error: "Intervenția nu există" });
});

test("S9-R3: date invalide dau 400 cu { error }", async () => {
  for (const body of [{}, { titlu: "" }, { titlu: "x", prioritate: "urgenta" }, { titlu: "x", rezolvata: "da" }]) {
    const res = await cerere("/interventii", "POST", body);
    assert.equal(res.status, 400, JSON.stringify(body));
    assert.equal(typeof (await res.json()).error, "string");
  }

  const res = await cerere("/interventii/1", "PATCH", { titlu: "   " });
  assert.equal(res.status, 400);
});

test("id invalid dă 400, rută necunoscută dă 404, JSON stricat dă 400", async () => {
  assert.equal((await cerere("/interventii/abc")).status, 400);
  assert.equal((await cerere("/interventii/1.5")).status, 400);
  assert.equal((await cerere("/nu-exista")).status, 404);
  const res = await cerere("/interventii", "POST", "{ stricat");
  assert.equal(res.status, 400);
  assert.equal(typeof (await res.json()).error, "string");
});

test("lista albă: câmpurile necunoscute și id-ul trimis de client sunt ignorate", async () => {
  const res = await cerere("/interventii", "POST", { id: 999, titlu: "  Spații  ", admin: true });
  const creata = await res.json();
  assert.notEqual(creata.id, 999);
  assert.equal(creata.titlu, "Spații");
  assert.equal(creata.admin, undefined);
  assert.equal(creata.prioritate, "medie");
  assert.equal(creata.rezolvata, false);
});

test("S9-R5: CORS permite originea frontendului", async () => {
  const res = await cerere("/health");
  assert.equal(res.headers.get("access-control-allow-origin"), "http://localhost:5173");
  assert.deepEqual(await res.json(), { status: "ok" });
});
