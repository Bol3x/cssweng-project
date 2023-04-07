"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userGetUnique_1 = __importDefault(require("../../api/userGetUnique"));
const databaseError_1 = __importDefault(require("../../../error/databaseError"));
const authenticateUser = (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userGetUnique_1.default)({ email: email.toLowerCase() });
        if (user == null) {
            return done(null, false, { message: 'No user with that email' });
        }
        if (yield bcryptjs_1.default.compare(password, user.pass)) {
            return done(null, user);
        }
        else {
            return done(null, false, { message: 'Incorrect Password' });
        }
    }
    catch (error) {
        console.log('User authentication error: ');
        const dbErr = error.code ? new databaseError_1.default(error.code, "User not found") : error;
        return done(dbErr, false, { message: 'An error occurred while logging in' });
    }
});
exports.authenticateUser = authenticateUser;
