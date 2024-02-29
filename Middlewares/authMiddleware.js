const jwt = require('jsonwebtoken');

const checkManagerRole = (req, res, next) => {
    // Get token from cookies
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Extract user role from decoded token
        const userRole = decoded.role;

        // Check if user has manager role
        if (userRole !== 'manager') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Store user information in request object
        req.user = decoded;

        // Continue to the next middleware
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

const checkAdminRole = (req, res, next) => {
    // Get token from cookies
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Extract user role from decoded token
        const userRole = decoded.role;

        // Check if user has admin role
        if (userRole !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Store user information in request object
        req.user = decoded;

        // Continue to the next middleware
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { checkManagerRole, checkAdminRole };
