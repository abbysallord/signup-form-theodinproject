const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const USERS_FILE = path.join(__dirname, '../database/users.json');

// Helper functions
function getUsers() {
    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, '[]');
        return [];
    }
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);
}

function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Register Route
router.post('/users', (req, res) => {
    console.log("REGISTER endpoint hit");
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
        return res.status(400).send("All fields are required");
    }

    const users = getUsers();
    const exists = users.find(u => u.email === email);

    if (exists) {
        return res.status(400).send("User already exists");
    }

    users.push({ firstname, lastname, email, password });
    saveUsers(users);

    console.log("User saved:", { firstname, lastname, email });
    res.status(200).send("Registered Successfully");
});

// Login Route
router.post('/login', (req, res) => {
    console.log("LOGIN endpoint hit");
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Email and password are required");
    }

    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(400).send("Invalid email");
    }

    if (user.password !== password) {
        return res.status(400).send("Invalid password");
    }

    res.status(200).send("LOGIN_SUCCESS");
});

module.exports = router;
