const express = require("express");
const router = express.Router();
const mysql = require("../db"); // Database connection

// 🟢 Get all clients
router.get("/", (req, res) => {
    mysql.query("SELECT * FROM clients", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 🔵 Get a single client by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    mysql.query("SELECT * FROM clients WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Client not found" });
        res.json(results[0]);
    });
});

// 🟠 Add a new client
router.post("/", (req, res) => {
    const { name, email, phone, address } = req.body;
    mysql.query("INSERT INTO clients (name, email, phone, address) VALUES (?, ?, ?, ?)", 
    [name, email, phone, address], 
    (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Client added successfully", id: results.insertId });
    });
});

// 🟣 Update client details
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    mysql.query("UPDATE clients SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?", 
    [name, email, phone, address, id], 
    (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Client updated successfully" });
    });
});

// 🔴 Delete a client
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    mysql.query("DELETE FROM clients WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Client deleted successfully" });
    });
});

module.exports = router;
