/**
 * @file productAdd.ts
 * @description This file contains the route for adding a product to the database
 */

import { Request, Response, NextFunction } from "express";

import DatabaseError from "../error/databaseError.js";

import prisma from "../../repositories/prismaClient.js";
import userGetUnique from "../user/api/userGetUnique.js";
import logAdd from "../logging/logAdd.js";
import transactionAdd from "../logging/transactions/transactionAdd.js";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, price, stock, description, category, brand} = req.body;
		const product = await prisma.product.create({
			data: {
				name,
				sell_price: Number(price),
				stock : Number(stock),
				brand,
				description,
				product_category: {
					connect: {
						category_ID: Number(category),
					}
				},
				avg_value: Number(price) * Number(stock),
				last_updated: new Date(),
			},
		});

		//@ts-ignore
		const user = await userGetUnique(req.user.email)

		const log = await logAdd(user!.user_ID, 3);

		const transaction

		const transaction = await transactionAdd(product.product_ID, Number(stock), user!.user_ID, 3);

		res.json(product);
	} catch (error : any) {
		console.log(error)
		next(DatabaseError.DBError(error.code));
	}
}