"use strict";
//send a message to user if a session exists for them in the server
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuth = void 0;
const verifyAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.isAuthenticated()) {
        const user = yield req.user;
        //@ts-ignore
        res.status(200).json({ message: "User is already logged in", userdata: { name: user.name, email: user.email, type: user.user_category.utype_title, expiry: req.session.cookie.expires } });
    }
    else {
        res.status(403).send({ message: 'You are not logged in' });
    }
});
exports.verifyAuth = verifyAuth;
