import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  role: { type: String, enum: ["guest", "admin", null], default: null },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
