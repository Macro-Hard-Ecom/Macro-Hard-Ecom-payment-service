const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const paymentRoutes = require("./routes/paymentRoutes");
const errorHandler = require("./middlewares/errorMiddleware");
const setupSwagger = require("./config/swagger");

dotenv.config();
connectDB(process.env.MONGO_URI);

const app = express();

app.use(cors({
  origin: 'http://3.89.71.141:8084/' || 'http://localhost:8084/'
}));
app.use(express.json());

// Routes
app.use("/api/payments", paymentRoutes);

// Swagger
setupSwagger(app);

// Error middleware
app.use(errorHandler);

module.exports = app;