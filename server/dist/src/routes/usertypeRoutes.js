"use strict";
/**
 * @file usertypeRoutes.ts
 * @description This file contains all routes for usertype-related services
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usertypeAdd_1 = __importDefault(require("../services/user/usertype/usertypeAdd"));
const usertypeGet_1 = __importDefault(require("../services/user/usertype/usertypeGet"));
const UserTypeRouter = express_1.default.Router();
UserTypeRouter.get('/', (req, res) => {
    res.render('addUserType');
});
UserTypeRouter.get('/get', usertypeGet_1.default);
UserTypeRouter.post('/add', usertypeAdd_1.default);
exports.default = UserTypeRouter;
