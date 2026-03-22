const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const { protect } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management endpoints
 */

router.post("/processPayment", protect, paymentController.processPayment);
router.get("/paymentStatus/:paymentId", protect, paymentController.paymentStatus);
router.post("/refundPayment", protect, paymentController.refundPayment);
router.get("/paymentLogs", protect, paymentController.paymentLogs);
router.get("/paymentStats", protect, paymentController.paymentStats);
router.get("/user/:userId", protect, paymentController.getPaymentsByUser);
router.get("/order/:orderId", protect, paymentController.getPaymentByOrder);
router.get("/testroute", paymentController.testApi);

module.exports = router;