import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import connectDB from "./config/db.js";
import configurePassport from "./config/passport.js";
import authRoutes from "./routes/auth.js";
import formRoutes from "./routes/form.js";
import errorHandler from "./utils/errorHandler.js";

// Load environment variables
dotenv.config();

// Validate environment variables
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in environment variables");
  process.exit(1);
}
if (!process.env.PORT) {
  console.warn("PORT is not defined, defaulting to 5000");
}
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error("Google OAuth credentials are not defined");
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined");
  process.exit(1);
}

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;
configurePassport();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(passport.initialize());

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Role-Based Authentication API Running",
  });
});
app.use("/auth", authRoutes);
app.use("/forms", formRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not found 404",
    errorMessage: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// global Handler
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app
      .listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
      })
      .on("error", (error) => {
        console.log("Error starting server", error);
        process.exit(1);
      });
  } catch (error) {
    console.log("Error starting server", error);
    process.exit(1);
  }
};

startServer();
