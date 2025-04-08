// utils/jwt.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'industry_standards';
const JWT_EXPIRES_IN = '1d';

// Generate JWT token with custom payload
const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Verify JWT token and return decoded payload
const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

// Middleware to protect routes
const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);

        // Attach user details to request object
        req.user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            roleId: decoded.roleId,
            roleName: decoded.roleName,
            customerId: decoded.customerId
        };

        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
};

// Optional: Middleware to restrict access to admins only
const isAdmin = (req, res, next) => {
    if (req.user.roleName !== 'admin') {
        return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
    }
    next();
};

module.exports = {
    generateToken,
    verifyToken,
    isAuthenticated,
    isAdmin
};
