const Employee = require('../models/employees.model');

exports.getAll = async (req, res) => {
  try {
    const employees = await Employee.find().populate('department');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);

    const emp = await Employee.findOne().skip(rand).populate('department');

    if (!emp) return res.status(404).json({ message: 'Not found' });
    res.json(emp);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id).populate('department');

    if (!emp) return res.status(404).json({ message: 'Not found' });
    res.json(emp);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.create = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;

    const newEmployee = new Employee({ firstName, lastName, department });
    await newEmployee.save();

    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;

    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: 'Not found' });

    emp.firstName = firstName;
    emp.lastName = lastName;
    emp.department = department;

    await emp.save();

    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: 'Not found' });

    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};