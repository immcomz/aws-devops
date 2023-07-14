const express = require("express");
const router = express.Router();
const { Patient } = require("../models/patient");

// Get all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.send(patients);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
// Delete a patient
router.delete("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);

    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    await patient.destroy();
    res.send("Patient deleted successfully");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
