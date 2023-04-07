"use strict";
/**
 * @file usertypeAdd.ts
 * @description This file contains the route for adding a user type to the database
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
const databaseError_1 = __importDefault(require("../../error/databaseError"));
const prismaClient_1 = __importDefault(require("../../../repositories/prismaClient"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { utype_title } = req.body;
        const userType = yield prismaClient_1.default.user_category.create({
            data: {
                utype_title,
            },
        });
        console.log(userType);
        res.json(userType);
    }
    catch (error) {
        console.log(error);
        next(databaseError_1.default.DBError(error.code));
    }
});