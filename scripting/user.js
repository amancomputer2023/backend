const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser, updateUser } = require("../models/userModel");
const { hashPassword, verifyPassword } = require("./hashing");

async function register(req, res) {
  try {
    const { username, email, password, firstName, lastName, phoneNumber } = req.body;
    const existingUser = await findUserByEmail(email);

    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await hashPassword(password);
    await createUser({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      profilePictureUrl: "",
      isActive: true,
      isVerified: true,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error in register:", err);
    res.status(500).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "Gajraj@0905",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", user, token });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ error: err.message });
  }
}

async function admin(req, res) {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, "Gajraj@0905");
    if (decoded.role !== "admin") return res.status(403).json({ message: "Access Denied" });

    res.json({ message: "Welcome to Admin Panel" });
  } catch (err) {
    console.error("Error in admin:", err);
    res.status(401).json({ message: "Invalid token" });
  }
}

async function updateUserDetail(req, res) {
  try {
    const { _id, username, email, password, firstName, lastName, phoneNumber, profilePictureUrl } = req.body;
    const updatedData = { username, email, firstName, lastName, phoneNumber, profilePictureUrl, updatedAt: new Date() };

    if (password) {
      updatedData.password = await hashPassword(password);
    }

    await updateUser(_id, updatedData);
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Error in updateUserDetail:", err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { register, login, admin, updateUserDetail };
