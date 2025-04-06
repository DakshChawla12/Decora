exports.isAuthenticated = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Not logged in' });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.session.roleId !== 1) {
        return res.status(403).json({ error: 'Admin only' });
    }
    next();
};
