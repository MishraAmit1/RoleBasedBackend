import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  pin: { type: String, required: true },
  phone: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Form", formSchema);
