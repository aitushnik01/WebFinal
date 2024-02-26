const generateOTP = () => {
    // Generate a 6-digit OTP (You can use any OTP generation library)
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const checkManagerRole = (req, res, next) => {
    if (req.user && req.user.role !== 'manager') {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
};

const checkAdminRole = (req, res, next) => {
    if (req.user && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
};

module.exports = { checkManagerRole, checkAdminRole, generateOTP };
