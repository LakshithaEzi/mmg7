const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    doctorName: { type: String, required: true },
    medication: { type: String, required: true },
    dosage: { type: String, required: true },
    dateIssued: { type: Date, default: Date.now },
    notes: { type: String },
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
