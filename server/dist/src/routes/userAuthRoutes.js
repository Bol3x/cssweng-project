"use strict";
/**
 * @file userAuthRoutes.ts
 * @description This file contains all routes for user authentication-related services
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const userCheckAuth_1 = __importDefault(require("../services/user/auth/userCheckAuth"));
const userNoAuth_1 = __importDefault(require("../services/user/auth/userNoAuth"));
const verifyAuth_1 = require("../services/user/auth/verifyAuth");
const verifyAdmin_1 = __importDefault(require("../services/user/auth/verifyAdmin"));
const UserAuthRouter = express_1.default.Router();
UserAuthRouter.post('/verifyAdmin', verifyAdmin_1.default);
UserAuthRouter.get('/checkAuth', verifyAuth_1.verifyAuth);
// Login Handle
UserAuthRouter.post('/login', userNoAuth_1.default, passport_1.default.authenticate('login'), (req, res) => {
    console.log("Logged in user");
    //@ts-ignore
    res.status(200).json({ message: "Successfully Logged in.", userdata: { name: req.user.name, email: req.user.email, type: req.user.user_category.utype_title, expiry: req.session.cookie.expires } });
});
// Logout Handle
UserAuthRouter.delete('/logout', userCheckAuth_1.default, (req, res, next) => {
    req.logOut((err) => {
        if (err)
            return next(err);
        res.status(200).json({ message: "Successfully Logged out." });
        console.log("Logged out user");
    });
});
exports.default = UserAuthRouter;
