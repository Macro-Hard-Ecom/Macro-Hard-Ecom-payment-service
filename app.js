const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const paymentRoutes = require("./routes/paymentRoutes");
const errorHandler = require("./middlewares/errorMiddleware");
const setupSwagger = require("./config/swagger");

dotenv.config();
connectDB(process.env.MONGO_URI);

const app = express();
app.use(express.json());

// Routes
app.use("/api/payments", paymentRoutes);

// Swagger
setupSwagger(app);

// Error middleware
app.use(errorHandler);

module.exports = app;