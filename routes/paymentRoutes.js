const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management endpoints
 */

router.post("/processPayment", paymentController.processPayment);
router.get("/paymentStatus/:paymentId", paymentController.paymentStatus);
router.post("/refundPayment", paymentController.refundPayment);
router.get("/paymentLogs", paymentController.paymentLogs);
router.get("/paymentStats", paymentController.paymentStats);
router.get("/testroute", paymentController.testApi);

module.exports = router;