/**
 * @file productGet.ts
 * @description This file contains the route for getting all products in the database
 */

//explicit Prisma dependency
import { Request, Response, NextFunction } from "express";

import prisma from "../../repositories/prismaClient.js";
import DatabaseError from "../error/databaseError.js";
import transactionAdd from "../logging/transactions/transactionAdd.js";
import { product } from "@prisma/client";
import logAdd from "../logging/logAdd.js";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const products = await prisma.product.findMany(
			{
				include: {
					product_category: true,
			}
		});

		//@ts-ignore
		const user = await userGetUnique(req.user.email);
		const log = await logAdd(user!.user_ID, 4)

		res.status(200).json(products);
	} catch (error: any) {
		next(DatabaseError.DBError(error.code));
	}
}