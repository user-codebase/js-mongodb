const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);

    const dep = await Department.findOne().skip(rand);

    if (!dep) return res.status(404).json({ message: 'Not found' });
    res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);

    if (!dep) return res.status(404).json({ message: 'Not found' });
    res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    const newDepartment = new Department({ name });
    await newDepartment.save();

    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { name } = req.body;

    const updated = await Department.findByIdAndUpdate(
      req.params.id,
      { $set: { name } },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Not found' });

    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Department.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: 'Not found' });

    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};