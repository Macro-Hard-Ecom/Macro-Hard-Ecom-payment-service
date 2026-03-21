const axios = require("axios");
const Payment = require("../models/Payment");

// Process a payment
exports.processPayment = async (req, res, next) => {
  try {
    const { orderId, userId, amount, paymentMethod } = req.body;

    // Validate user via User Service
    const userResp = await axios.get(`${process.env.USER_SERVICE_URL}/getUser/${userId}`);
    if (!userResp.data) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch order via Order Service
    const orderResp = await axios.get(`${process.env.ORDER_SERVICE_URL}/order/${orderId}`);
    if (!orderResp.data) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Simulate payment
    let status = "failed";
    if (paymentMethod === "mock" || Math.random() > 0.1) {
      status = "success";
    }

    const payment = await Payment.create({ orderId, userId, amount, paymentMethod, status });

    // Update order status if payment successful
    if (status === "success") {
      await axios.put(`${process.env.ORDER_SERVICE_URL}/order/updateStatus`, {
        orderId,
        status: "paid"
      });
    }

    res.status(201).json({ success: true, payment });
  } catch (err) {
    next(err);
  }
};

// Get payment status/details
exports.paymentStatus = async (req, res, next) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findOne({ paymentId });
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json({ success: true, payment });
  } catch (err) {
    next(err);
  }
};

// Refund a payment
exports.refundPayment = async (req, res, next) => {
  try {
    const { paymentId, reason } = req.body;

    const payment = await Payment.findOne({ paymentId });
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.status = "refunded";
    await payment.save();

    // Notify Order Service
    await axios.put(`${process.env.ORDER_SERVICE_URL}/order/updateStatus`, {
      orderId: payment.orderId,
      status: "refunded",
      reason
    });

    res.json({ success: true, payment });
  } catch (err) {
    next(err);
  }
};

// Payment logs with pagination
exports.paymentLogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const payments = await Payment.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Payment.countDocuments();

    res.json({
      success: true,
      page,
      limit,
      total,
      payments
    });
  } catch (err) {
    next(err);
  }
};

// Payment stats
exports.paymentStats = async (req, res, next) => {
  try {
    const totalPayments = await Payment.countDocuments();
    const successfulPayments = await Payment.countDocuments({ status: "success" });
    const failedPayments = await Payment.countDocuments({ status: "failed" });
    const refundedPayments = await Payment.countDocuments({ status: "refunded" });

    const revenueAgg = await Payment.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
    ]);
    const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

    res.json({
      success: true,
      totalPayments,
      successfulPayments,
      failedPayments,
      refundedPayments,
      totalRevenue
    });
  } catch (err) {
    next(err);
  }
};