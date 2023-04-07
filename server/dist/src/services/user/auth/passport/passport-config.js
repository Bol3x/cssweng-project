"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import passport-local
const passport_local_1 = require("passport-local");
const userGetUnique_1 = __importDefault(require("../../api/userGetUnique"));
const authenticateUser_1 = require("./authenticateUser");
function initializeUser(passport) {
    passport.use('login', new passport_local_1.Strategy({
        usernameField: 'email',
        passwordField: 'password',
    }, authenticateUser_1.authenticateUser));
    passport.serializeUser((user, done) => { done(null, user.email); });
    passport.deserializeUser((email, done) => {
        done(null, (0, userGetUnique_1.default)({ email }));
    });
}
exports.default = initializeUser;
