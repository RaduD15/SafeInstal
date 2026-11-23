import express from "express";
import cors from "cors";
import interventiiRouter from "./routes/interventii.js";

const app = express();

// CORS: browserul blochează cererile de pe :5173 către :3001
// dacă serverul nu spune explicit că le permite
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));

// Transformă corpul JSON al cererii în req.body
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/interventii", interventiiRouter);

// Rută necunoscută
app.use((req, res) => {
  res.status(404).json({ error: "Ruta nu există" });
});

// Tratare centralizată a erorilor (Express 5 trimite aici și erorile async).
// Cei patru parametri sunt obligatorii: după ei recunoaște Express handler-ul de erori.
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) console.error(err); // 4xx sunt greșeli ale clientului, nu ale serverului
  res.status(status).json({ error: status === 500 ? "Eroare internă" : err.message });
});

export default app;
