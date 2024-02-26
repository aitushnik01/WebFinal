const checkManagerRole = (req, res, next) => {
    if (req.user.role !== 'Manager') {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
};

const checkAdminRole = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
};

module.exports = { checkManagerRole, checkAdminRole };