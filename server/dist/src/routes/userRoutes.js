"use strict";
/**
 * @file settings.ts
 * @description contains all user routes involving logging in, logging out, and registering new users
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAddEmployee_1 = __importDefault(require("../services/user/userAddEmployee"));
const userGetEmployees_1 = __importDefault(require("../services/user/userGetEmployees"));
const userRemove_1 = __importDefault(require("../services/user/userRemove"));
const usertypeRoutes_1 = __importDefault(require("./usertypeRoutes"));
const validateUserdata_1 = __importDefault(require("../services/middleware validation/validateUserdata"));
const verifyAdmin_1 = __importDefault(require("../services/user/auth/verifyAdmin"));
const UserRouter = express_1.default.Router();
UserRouter.use('/type', usertypeRoutes_1.default);
UserRouter.get('/', (req, res) => {
    res.render('addUser');
});
UserRouter.get('/get', userGetEmployees_1.default);
UserRouter.post('/add', validateUserdata_1.default, userAddEmployee_1.default);
UserRouter.post('/check', verifyAdmin_1.default);
UserRouter.delete('/:email', userRemove_1.default);
exports.default = UserRouter;
