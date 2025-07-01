const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/characters", (req, res) => {
  const dataPath = path.join(__dirname, "data");

  fs.readdir(dataPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read data directory" });
    }

    const characters = files
      .filter((file) => file.endsWith(".json"))
      .map((file) => path.basename(file, ".json"));

    res.json({ characters });
  });
});

app.get("/characters/:name", (req, res) => {
  const name = req.params.name;
  const filePath = path.join(__dirname, "data", `${name}.json`);

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(404).json({ error: "Character not found" });
    }

    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch (parseErr) {
      res.status(500).json({ error: "Error parsing JSON" });
    }
  });
});

// Server Local
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
