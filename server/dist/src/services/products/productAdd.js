"use strict";
/**
 * @file productAdd.ts
 * @description This file contains the route for adding a product to the database
 */
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
const databaseError_1 = __importDefault(require("../error/databaseError"));
const prismaClient_1 = __importDefault(require("../../repositories/prismaClient"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, stock, description, category, brand } = req.body;
        const product = yield prismaClient_1.default.product.create({
            data: {
                name,
                sell_price: Number(price),
                stock: Number(stock),
                brand,
                description,
                product_category: {
                    connect: {
                        category_ID: category,
                    }
                },
                avg_value: Number(price) * Number(stock),
                last_updated: new Date(),
            },
        });
        res.json(product);
    }
    catch (error) {
        next(databaseError_1.default.DBError(error.code));
    }
});
