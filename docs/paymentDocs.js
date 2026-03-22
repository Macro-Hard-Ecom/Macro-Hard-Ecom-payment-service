/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management endpoints
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     PaymentRequest:
 *       type: object
 *       required:
 *         - orderId
 *         - userId
 *         - paymentMethod
 *       properties:
 *         orderId:
 *           type: string
 *         userId:
 *           type: string
 *         paymentMethod:
 *           type: string
 *           enum: [card, paypal]
 *
 *     RefundRequest:
 *       type: object
 *       required:
 *         - paymentId
 *         - reason
 *       properties:
 *         paymentId:
 *           type: string
 *         reason:
 *           type: string
 *
 *     PaymentResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         payment:
 *           type: object
 *           properties:
 *             paymentId:
 *               type: string
 *             orderId:
 *               type: string
 *             userId:
 *               type: string
 *             amount:
 *               type: number
 *             paymentMethod:
 *               type: string
 *             status:
 *               type: string
 *               enum: [pending, success, failed, refunded]
 *             createdAt:
 *               type: string
 *             updatedAt:
 *               type: string
 *
 *     PaymentLogsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         page:
 *           type: number
 *         limit:
 *           type: number
 *         total:
 *           type: number
 *         payments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PaymentResponse'
 *
 *     PaymentStatsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         totalPayments:
 *           type: number
 *         successfulPayments:
 *           type: number
 *         failedPayments:
 *           type: number
 *         refundedPayments:
 *           type: number
 *         totalRevenue:
 *           type: number
 */

/**
 * @swagger
 * /api/payments/processPayment:
 *   post:
 *     summary: Process a payment
 *     description: Amount is automatically calculated from the order. No need to pass amount in the request body.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentRequest'
 *           example:
 *             orderId: "69bfd29e0ef8157366092f4d"
 *             userId: "shaheedwajee@gmail.com"
 *             paymentMethod: "card"
 *     responses:
 *       201:
 *         description: Payment processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or Order not found
 *       503:
 *         description: Order Service unavailable
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/payments/paymentStatus/{paymentId}:
 *   get:
 *     summary: Get payment status/details
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the payment (paymentId field, not MongoDB _id)
 *     responses:
 *       200:
 *         description: Payment found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Payment not found
 */

/**
 * @swagger
 * /api/payments/refundPayment:
 *   post:
 *     summary: Refund a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefundRequest'
 *           example:
 *             paymentId: "a556fef7-c514-4b73-86a3-e653810f5b0d"
 *             reason: "Customer requested refund"
 *     responses:
 *       200:
 *         description: Payment refunded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/payments/paymentLogs:
 *   get:
 *     summary: Get all payment logs with pagination
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records per page (default 10)
 *     responses:
 *       200:
 *         description: List of payment logs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentLogsResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/payments/paymentStats:
 *   get:
 *     summary: Get payment statistics
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentStatsResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/payments/testroute:
 *   get:
 *     summary: Test Route
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Test Route
 *       500:
 *         description: Server error
 */