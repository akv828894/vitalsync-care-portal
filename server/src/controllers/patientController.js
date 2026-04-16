const formatUser = require("../utils/formatUser");

const getPatientOverview = async (req, res) => {
  res.json({
    message: "Your care dashboard is up to date and ready for review.",
    user: formatUser(req.user),
    stats: [
      {
        label: "Upcoming visits",
        value: "03",
        note: "1 confirmed consultation scheduled for this week",
      },
      {
        label: "Active prescriptions",
        value: "02",
        note: "Next renewal reminder opens in 4 days",
      },
      {
        label: "Care plan tasks",
        value: "05",
        note: "2 health tasks are due before your next review",
      },
    ],
    nextAppointment: {
      doctorName: "Dr. Rohan Mehta",
      department: "Cardiology",
      slot: "Wednesday, 10:30 AM",
      location: "Skyline Care Wing, Floor 2",
      mode: "In-person consultation",
      checkIn: "Arrive 15 minutes early for vitals and document review",
      status: "Confirmed",
    },
    portalHighlights: [
      {
        title: "Prescription vault",
        detail: "Keep dosage instructions, refills, and previous prescriptions in one secure space.",
      },
      {
        title: "Visit coordination",
        detail: "Patients, doctors, and front-desk teams stay aligned on schedule changes and reminders.",
      },
      {
        title: "Care continuity",
        detail: "Important pre-visit instructions and follow-up notes remain visible after each consultation.",
      },
    ],
    careTeam: [
      {
        name: "Dr. Rohan Mehta",
        specialty: "Consultant Cardiologist",
        availability: "Clinic hours: Monday, Wednesday, Friday",
      },
      {
        name: "Aisha Verma",
        specialty: "Patient Care Coordinator",
        availability: "Support desk: 8:00 AM - 8:00 PM",
      },
      {
        name: "Ritika Sharma",
        specialty: "Diagnostics Desk",
        availability: "Report assistance and same-day update support",
      },
    ],
    reminders: [
      {
        title: "Pre-visit checklist",
        detail: "Carry your latest reports and continue prescribed medicines unless your doctor advises otherwise.",
      },
      {
        title: "Prescription reminder",
        detail: "Your current blood pressure medication renewal window opens in 4 days.",
      },
      {
        title: "Profile completion",
        detail: "Add an emergency contact to speed up future intake and support coordination.",
      },
    ],
    supportDesk: {
      email: "care@vitalsync.health",
      phone: "+91 99999 55555",
      availability: "Monday - Saturday | 8:00 AM - 8:00 PM",
    },
    securityNote:
      "Your dashboard access is protected with signed session tokens and role-aware route controls.",
    generatedAt: new Date().toISOString(),
  });
};

module.exports = {
  getPatientOverview,
};
