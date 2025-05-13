import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({
      message: "No token, authorization denied",
      details: "Please provide a valid authentication token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired",
        details: "Please login again to get a new token",
      });
    }
    res.status(401).json({
      message: "Token is not valid",
      details: error.message,
    });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required",
      details: "Please authenticate before accessing this resource",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access required",
      details: "This action requires admin privileges",
    });
  }
  next();
};

export { authMiddleware, adminMiddleware };
