const express = require("express");
const router = express.Router();
const Provider = require("../models/Provider");

router.get("/", async (req, res) => {
  try {
    const sampleProviders = [
      {
        name: "Sunrise Recovery Center",
        state: "FL",
        insurances: ["Aetna", "Cigna", "United"],
        levelsOfCare: ["Detox", "Residential"],
      },
      {
        name: "Harmony Wellness",
        state: "GA",
        insurances: ["BlueCross", "Medicaid"],
        levelsOfCare: ["PHP", "IOP"],
      },
      {
        name: "North Shore Rehab",
        state: "FL",
        insurances: ["Aetna", "Humana"],
        levelsOfCare: ["Residential", "OP"],
      },
    ];

    await Provider.deleteMany({}); // Clear existing data
    await Provider.insertMany(sampleProviders);

    res.status(200).json({ message: "✅ Sample providers seeded." });
  } catch (err) {
    console.error("❌ Seeding error:", err);
    res.status(500).json({ error: "Seeding failed." });
  }
});

module.exports = router;