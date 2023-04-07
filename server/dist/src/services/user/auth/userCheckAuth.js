"use strict";
/**
 * Checks if the user is authenticated
 * if authenticated, continues on with the request
 * otherwise, send forbidden message to client
 */
Object.defineProperty(exports, "__esModule", { value: true });
function userCheckAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'You are not logged in' });
}
exports.default = userCheckAuth;
