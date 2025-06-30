const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const characters = [
  {
    name: "Yoshimitsu",
    origin: "Japan",
    style: "Kenjutsu",
    moves: ["Flea Stance", "Manji Dragonfly"]
  },
  {
    name: "King",
    origin: "Mexico",
    style: "Pro Wrestling",
    moves: ["Giant Swing", "Chain Throw"]
  }
];

app.get("/api/characters", (req, res) => {
  res.json(characters);
});

app.get("/api/characters/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const found = characters.find(c => c.name.toLowerCase() === name);
  if (!found) return res.status(404).json({ error: "Character not found" });
  res.json(found);
});

app.listen(PORT, () => {
  console.log("API running at http://localhost:" + PORT);
});