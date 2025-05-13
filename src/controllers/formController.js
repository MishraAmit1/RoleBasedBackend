import Form from "../models/Form.js";

const createForm = async (req, res) => {
  const { name, address, pin, phone } = req.body;

  // Validate required fields
  if (!name || !address || !pin || !phone) {
    return res.status(400).json({
      message: "Missing required fields",
      details: {
        name: name ? undefined : "Name is required",
        address: address ? undefined : "Address is required",
        pin: pin ? undefined : "PIN is required",
        phone: phone ? undefined : "Phone number is required",
      },
    });
  }

  // Validate PIN format
  if (!/^\d{6}$/.test(pin)) {
    return res.status(400).json({ message: "PIN must be a 6-digit number" });
  }

  // Validate phone number
  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({ message: "Phone must be a 10-digit number" });
  }

  try {
    const form = await Form.create({
      name,
      address,
      pin,
      phone,
      createdBy: req.user.id,
    });
    res.status(201).json(form);
  } catch (error) {
    console.error("Form creation error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        details: error.errors,
      });
    }
    res.status(500).json({
      message: "Server error while creating form",
      error: error.message,
    });
  }
};

const getForms = async (req, res) => {
  try {
    const forms = await Form.find().populate("createdBy", "email");
    res.json(forms);
  } catch (error) {
    console.error("Form fetching error:", error);
    res.status(500).json({
      message: "Error fetching forms",
      error: error.message,
    });
  }
};

const updateForm = async (req, res) => {
  const { id } = req.params;
  const { name, address, pin, phone } = req.body;

  if (pin && !/^\d{6}$/.test(pin)) {
    return res.status(400).json({ message: "PIN must be a 6-digit number" });
  }

  if (phone && !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ message: "Phone must be a 10-digit number" });
  }

  try {
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Update karo id fields provided
    if (name) form.name = name;
    if (address) form.address = address;
    if (pin) form.pin = pin;
    if (phone) form.phone = phone;

    await form.save();
    res.json(form);
  } catch (error) {
    console.error("Form update error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid form ID format" });
    }

    res.status(500).json({
      message: "Error updating form",
      error: error.message,
    });
  }
};

const deleteForm = async (req, res) => {
  const { id } = req.params;
  try {
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    await form.deleteOne();
    res.json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error("Form deletion error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid form ID format" });
    }

    res.status(500).json({
      message: "Error deleting form",
      error: error.message,
    });
  }
};

export { createForm, getForms, updateForm, deleteForm };
