const Patient = require("../models/Patient");

exports.createPatient = async (req, res) => {
  const { firstName, lastName, dob, gender, phone, email, address, emergencyContact, username } = req.body;

  try {
    // Check if username already exists
    const existingPatient = await Patient.findOne({ username });
    if (existingPatient) {
      return res.status(400).json({ message: "Username already exists. Please choose another one." });
    }

    const newPatient = new Patient({
      firstName,
      lastName,
      username,
      dob,
      gender,
      phone,
      email,
      address,
      emergencyContact,
    });

    await newPatient.save();
    return res.status(201).json({ message: "Patient registered successfully", patient: newPatient });
  } catch (error) {
    return res.status(500).json({ message: "Error creating patient", error: error.message });
  }
};

exports.getPatientName = (req, res) => {
  const query = 'SELECT name FROM patients LIMIT 1'; // assuming 'patients' table has a 'name' column
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length > 0) {
      res.json({ patientName: results[0].name });
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  });
};
