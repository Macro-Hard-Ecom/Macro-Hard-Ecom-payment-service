const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const PaymentSchema = new mongoose.Schema(
  {
    paymentId: { type: String, default: () => uuidv4(), unique: true },
    orderId: { type: String, required: true },
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["card", "paypal", "mock"], required: true },
    status: { type: String, enum: ["pending", "success", "failed", "refunded"], default: "pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);