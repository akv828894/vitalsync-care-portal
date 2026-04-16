const express = require("express");
const { getPatientOverview } = require("../controllers/patientController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/overview", protect, authorizeRoles("patient", "doctor", "operations"), getPatientOverview);

module.exports = router;
