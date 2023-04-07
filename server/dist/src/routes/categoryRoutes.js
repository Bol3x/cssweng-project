"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file categoryRoutes.ts
 * @description This file contains all the routes for product category operations
 */
const express_1 = __importDefault(require("express"));
//services - function request handlers for each route
const categoryAdd_1 = __importDefault(require("../services/products/category/categoryAdd"));
const categoryGet_1 = __importDefault(require("../services/products/category/categoryGet"));
const categoryEdit_1 = __importDefault(require("../services/products/category/categoryEdit"));
const categoryRemove_1 = __importDefault(require("../services/products/category/categoryRemove"));
const userCheckAdmin_1 = __importDefault(require("../services/user/auth/userCheckAdmin"));
const CategoryRouter = express_1.default.Router();
CategoryRouter.get('/', (req, res) => {
    res.render('addCategory');
});
CategoryRouter.post('/add', userCheckAdmin_1.default, categoryAdd_1.default);
CategoryRouter.get('/get', categoryGet_1.default);
CategoryRouter.put('/:id', userCheckAdmin_1.default, categoryEdit_1.default);
CategoryRouter.delete('/:id', userCheckAdmin_1.default, categoryRemove_1.default);
exports.default = CategoryRouter;
