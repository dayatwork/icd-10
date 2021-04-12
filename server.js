import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

import { ICD10 } from "./ICD10.js";

const app = express();

app.use(express.json());
app.use(cors());

const icd10 = new ICD10();
icd10.init();

app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.get("/api/icd-10/:id", async (req, res) => {
  const data = await icd10.findById(req.params.id);
  res.json(data);
});

app.get("/api/icd-10/code/:code", async (req, res) => {
  const data = await icd10.findByCode(req.params.code);
  res.json(data);
});
app.get("/api/icd-10/name/:name", async (req, res) => {
  const data = await icd10.findByName(req.params.name);
  res.json(data);
});

app.get("/api/icd-10/search/:query", async (req, res) => {
  const data = await icd10.findByQuery(req.params.query);
  res.json(data);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
