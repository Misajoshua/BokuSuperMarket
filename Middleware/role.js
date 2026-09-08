// //create authorization middleware
// exports.authorize = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({
//                 message: 'You are not allowed to perform this action'
//             });
//         }
//         next();
//     };
// };

// Middleware to restrict access based on user roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized, no user found' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Access denied. Required role(s): ${roles.join(', ')}. Your role: ${req.user.role}`
            });
        }
        next();
    };
};