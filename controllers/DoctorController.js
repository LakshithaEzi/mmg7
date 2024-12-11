const Prescription = require('../models/Prescription');

// Get all prescriptions
exports.getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find();
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching prescriptions', error });
    }
};

// Get a single prescription by ID
exports.getPrescriptionById = async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id);
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        res.status(200).json(prescription);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching prescription', error });
    }
};

// Create a new prescription
exports.createPrescription = async (req, res) => {
    try {
        const newPrescription = new Prescription(req.body);
        const savedPrescription = await newPrescription.save();
        res.status(201).json(savedPrescription);
    } catch (error) {
        res.status(400).json({ message: 'Error creating prescription', error });
    }
};

// Update a prescription by ID
exports.updatePrescription = async (req, res) => {
    try {
        const updatedPrescription = await Prescription.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedPrescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        res.status(200).json(updatedPrescription);
    } catch (error) {
        res.status(400).json({ message: 'Error updating prescription', error });
    }
};

// Delete a prescription by ID
exports.deletePrescription = async (req, res) => {
    try {
        const deletedPrescription = await Prescription.findByIdAndDelete(req.params.id);
        if (!deletedPrescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        res.status(200).json({ message: 'Prescription deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting prescription', error });
    }
};
