/**
 * @file productAdd.ts
 * @description This file contains the route for adding a product to the database
 */

import { Request, Response, NextFunction } from "express";

import DatabaseError from "../../error/databaseError.js";

import prisma from "../../../repositories/prismaClient.js";
import userGetUnique from "../../user/api/userGetUnique.js";
import logAdd from "../../logging/logAdd.js";
import transactionAdd from "../../logging/transactions/transactionAdd.js";
import productAdd from "../../user/api/productAdd.js";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const product = await productAdd(req.body)


		const user = await userGetUnique(req.user!.email)

		const log = await logAdd(user!.user_ID, 3);

		const transaction = await transactionAdd(product.product_ID, Number(req.body.stock), log.log_ID);

		res.status(200).json(product);
	} catch (error : any) {
		next(DatabaseError.Type(error.code));
	}
}