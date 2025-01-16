const User = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');

// GET all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// POST create a new user
exports.createUser = async (req, res) => {
  const { username, age, hobbies } = req.body;

  if (!username || !age || !Array.isArray(hobbies)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const user = new User({ id: uuidv4(), username, age, hobbies });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

// PUT update user
exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, age, hobbies } = req.body;

  if (!username || !age || !Array.isArray(hobbies)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, { username, age, hobbies }, { new: true });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
