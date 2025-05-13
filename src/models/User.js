import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  role: { type: String, enum: ["guest", "admin"], default: "guest" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
