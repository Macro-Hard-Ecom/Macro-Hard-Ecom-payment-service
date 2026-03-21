/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management endpoints
 *
 * components:
 *   schemas:
 *     PaymentRequest:
 *       type: object
 *       required:
 *         - orderId
 *         - userId
 *         - amount
 *         - paymentMethod
 *       properties:
 *         orderId:
 *           type: string
 *         userId:
 *           type: string
 *         amount:
 *           type: number
 *         paymentMethod:
 *           type: string
 *           enum: [card, paypal, mock]
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
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentRequest'
 *     responses:
 *       201:
 *         description: Payment processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentResponse'
 *       404:
 *         description: User or Order not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/payments/paymentStatus/{paymentId}:
 *   get:
 *     summary: Get payment status/details
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the payment
 *     responses:
 *       200:
 *         description: Payment found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentResponse'
 *       404:
 *         description: Payment not found
 */

/**
 * @swagger
 * /api/payments/refundPayment:
 *   post:
 *     summary: Refund a payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefundRequest'
 *     responses:
 *       200:
 *         description: Payment refunded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentResponse'
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
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/payments/paymentStats:
 *   get:
 *     summary: Get payment statistics
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Payment statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentStatsResponse'
 *       500:
 *         description: Server error
 */