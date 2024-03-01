const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key'; // Change this to your actual secret key

const checkManagerRole = (req, res, next) => {
    // Check if token is present in request cookies
    const token = req.cookies.token;

    // If token is not present, return unauthorized
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Check if user has manager role
        if (decoded.role !== 'manager') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // If user has manager role, proceed to next middleware
        req.user = decoded;
        next();
    } catch (error) {
        // If token verification fails, return unauthorized
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

const checkAdminRole = (req, res, next) => {
    // Similar implementation as checkManagerRole, but checking for admin role
};

const generateOTP = () => {
    // Generate a 6-digit OTP (You can use any OTP generation library)
    return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = { checkManagerRole, checkAdminRole, generateOTP };
