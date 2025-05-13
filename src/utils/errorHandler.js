const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle specific Mongoose errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation error",
      details: err.errors,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
      details: err.message,
    });
  }

  // Handle JWT errors
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Token expired",
      details: "Please login again",
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      message: "Invalid token",
      details: err.message,
    });
  }

  // Default to 500 for unhandled errors
  res.status(500).json({
    message: "Server error",
    error: err.message,
  });
};

export default errorHandler;
