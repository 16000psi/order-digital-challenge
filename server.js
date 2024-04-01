import express from "express";
import cors from "cors";
import data from "./data/data.json" assert { type: "json" };

const app = express();
const port = 11194;

app.use(cors());

app.get("/api/data", (_, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Restaurant service listening on port ${port}`);
});
