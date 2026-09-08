 const jwt = require('jsonwebtoken');

// // Middleware to verify JWT token
// exports.protect = (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header
//     if (!token) {
//         return res.status(401).json({ message: 'Not authorized, no token' });
//     }
    
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Not authorized, token failed' });
//     }
// };


exports.protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Not authorized, no token'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Not authorized, token failed'
        });
    }
};