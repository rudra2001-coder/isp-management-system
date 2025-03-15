const express = require("express");
const router = express.Router();
const { addMikrotikUser } = require("../mikrotik");

// 🟢 Add User to MikroTik
router.post("/add-user", async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await addMikrotikUser(username, password);
        res.json({ message: "User added successfully", result });
    } catch (error) {
        res.status(500).json({ error: "Failed to add user" });
    }
});

module.exports = router;
// Get bandwidth usage (interface stats)
router.get("/bandwidth", async (req, res) => {
    try {
        const result = await getInterfaceStats();
        res.json({ message: "Interface stats fetched successfully", result });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch interface stats" });
    }
});
// Get router status (CPU, RAM)
router.get("/status", async (req, res) => {
    try {
        const result = await getRouterStatus();
        res.json({ message: "Router status fetched successfully", result });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch router status" });
    }
});
