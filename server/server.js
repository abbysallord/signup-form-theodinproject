import express from "express";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

/* ---------------- MIDDLEWARE ---------------- */

// Built-in body parser
app.use(express.json());

// CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

/* ---------------- DATABASE FUNCTIONS ---------------- */

if (!fs.existsSync("users.json")) {
  fs.writeFileSync("users.json", "[]");
}

function getUsers() {
  return JSON.parse(fs.readFileSync("users.json"));
}

function saveUsers(users) {
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
}

/* ---------------- ROUTES ---------------- */

// REGISTER
app.post("/users", (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const users = getUsers();
  const exists = users.find(u => u.email === email);
    console.log("register end came....")
  if (exists) {
    return res.status(400).send("User already exists");
  }

  users.push({ firstname, lastname, email, password });
  saveUsers(users);

  res.status(201).send("Registered Successfully");
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;
    console.log("login end came....")
  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).send("Invalid email");
  }

  if (user.password !== password) {
    return res.status(401).send("Invalid password");
  }

  res.status(200).send("LOGIN_SUCCESS");
});

// FORGOT PASSWORD
app.post("/forgotpass", (req, res) => {
  const { email } = req.body;

  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).send("Email Not Found");
  }

  res.status(200).send("Email Found");
});

/* ---------------- SERVER ---------------- */

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
