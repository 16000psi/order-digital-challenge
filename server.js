import express from "express";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import data from "./data/data.json" assert { type: "json" };

const app = express();
const port = process.env.PORT || 3000;
const appPath = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(appPath, "dist")));
app.use(cors());

app.get("/api/data", (req, res) => {
  const { sortBy, order, filter } = req.query;
  const filteredData = data.filter((a) => !filter || a.cuisine === filter);
  const sortedData = filteredData.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) {
      return order === "descending" ? 1 : -1;
    } else {
      return order === "descending" ? -1 : 1;
    }
  });
  res.json(sortedData);
});

app.get("*", (_, res) => {
  res.sendFile(path.join(appPath, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Restaurant service listening on port ${port}`);
});
