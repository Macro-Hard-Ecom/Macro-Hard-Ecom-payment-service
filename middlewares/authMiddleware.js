const jwt = require('jsonwebtoken');
const axios = require('axios');

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://54.254.157.28:8080';

const protect = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }

  try {
    const response = await axios.get(
      `${USER_SERVICE_URL}/api/auth/validateToken`,
      {
        params: { token },
        timeout: 5000,
      }
    );

    if (response.data !== true) {
      return res.status(401).json({
        success: false,
        message: 'Token rejected by User Service.',
      });
    }

    const decoded = jwt.decode(token);

    req.user = {
      ...decoded,
      userId: decoded?.id?.toString() || decoded?.userId?.toString() || null,
    };

    next();
  } catch (error) {
    return res.status(503).json({
      success: false,
      message: 'Authentication service unavailable. Please try again later.',
    });
  }
};

module.exports = { protect };