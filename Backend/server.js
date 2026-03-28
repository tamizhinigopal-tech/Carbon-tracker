// Import required modules
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "Frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "Frontend", "index.html"));
});

// Emission factors (given)
const DIESEL_FACTOR = 2.68; // kg CO2 per liter
const ELECTRICITY_FACTOR = 0.82; // kg CO2 per kWh

// API Endpoint
app.post("/calculate-emissions", (req, res) => {
    try {
        const {
            mineName,
            coalProduction,
            dieselUsage,
            electricityUsage,
            vehicles
        } = req.body;

        // Validation
        if (
            !mineName ||
            dieselUsage < 0 ||
            electricityUsage < 0 ||
            coalProduction < 0 ||
            vehicles < 0
        ) {
            return res.status(400).json({ error: "Invalid input values" });
        }

        // Core Logic
        const dieselEmission = dieselUsage * DIESEL_FACTOR;
        const electricityEmission = electricityUsage * ELECTRICITY_FACTOR;
        const totalEmission = dieselEmission + electricityEmission;

        // Risk Level
        let riskLevel = "Low";
        if (totalEmission > 5000) riskLevel = "High";
        else if (totalEmission > 2000) riskLevel = "Medium";

        // Smart Suggestions
        let suggestions = [];

        if (dieselEmission > electricityEmission) {
            suggestions.push("Switch to electric mining vehicles");
            suggestions.push("Optimize fuel usage using AI monitoring");
        }

        if (electricityEmission > dieselEmission) {
            suggestions.push("Adopt solar or renewable energy sources");
            suggestions.push("Upgrade to energy-efficient machinery");
        }

        suggestions.push("Implement carbon capture technologies");
        suggestions.push("Improve operational efficiency");

        // Send response
        res.json({
            mineName,
            totalEmission,
            dieselEmission,
            electricityEmission,
            riskLevel,
            suggestions
        });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});