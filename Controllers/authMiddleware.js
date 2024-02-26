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

module.exports = { checkManagerRole, checkAdminRole };
