"use strict";
/**
 * Checks if the user is not authenticated
 * Used for login route
 * if not authenticated, continues on with the request
 * otherwise, redirects to home page
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    if (req.isUnauthenticated()) {
        return next();
    }
    next(new Error('User is already authenticated'));
};
