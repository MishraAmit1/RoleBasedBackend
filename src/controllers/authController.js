import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

const googleLogin = (req, res) => {
  const token = generateToken(req.user);
  const user = JSON.stringify({
    id: req.user._id,
    email: req.user.email,
    role: req.user.role,
  });
  const frontendUrl =
    process.env.FRONTEND_URL || "https://role-based-frontend-plum.vercel.app";
  res.redirect(
    `${frontendUrl}?token=${token}&user=${encodeURIComponent(user)}`
  );
  res.json({
    token,
    user: { id: req.user._id, email: req.user.email, role: req.user.role },
  });
};

const setRole = async (req, res) => {
  const { role } = req.body;
  if (!role) {
    return res.status(400).json({ message: "Role is required" });
  }
  if (!["guest", "admin"].includes(role)) {
    return res.status(400).json({
      message: "Invalid role",
      details: "Role must be either 'guest' or 'admin'",
    });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.role = role;
    await user.save();
    const token = generateToken(user);
    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Role setting error:", error);
    res.status(500).json({
      message: "Error setting role",
      error: error.message,
    });
  }
};

const logout = (req, res) => {
  res.json({
    message:
      "Logout successful. Please remove the token from your client storage.",
  });
};

export { googleLogin, setRole, logout };
