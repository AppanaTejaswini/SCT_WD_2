const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("public"));

let laps = [];

app.get("/laps", (req, res) => {
    res.json(laps);
});

app.post("/laps", (req, res) => {
    laps.push(req.body);
    res.json({ message: "Lap saved" });
});

app.delete("/laps", (req, res) => {
    laps = [];
    res.json({ message: "All laps cleared" });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});