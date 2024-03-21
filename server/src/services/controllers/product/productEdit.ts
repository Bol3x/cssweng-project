/**
 * @file productEdit.ts
 * @description This file contains the route for editing an existing product in the database
 */

import { Request, Response, NextFunction } from "express";

import DatabaseError from "../../error/databaseError.js";

import prisma from "../../../repositories/prismaClient.js";

import transactionAdd from "../../logging/transactions/transactionAdd.js";
import logAdd from "../../logging/logAdd.js";
import userGetUnique from "../../user/api/userGetUnique.js";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		//get the product id from the request parameters
		const { name, sell_price, stock, sales, type, brand, order_amt } = req.body;
		const { id } = req.params;

		console.log(req.body);
		console.log(req.params);

		//update the product
		const product = await prisma.product.update({
			where: {
				product_ID: Number(id),
			},
			data: {
				name: name || undefined,
				brand: brand || undefined,
				sell_price: Number(sell_price),
				stock: Number(stock),
				sales: Number(sales),
				order_amt: Number(order_amt),
				type: type || undefined,
				avg_value: Number(sell_price) * Number(stock),
				revenue: Number(sell_price) * Number(sales),
				last_updated: new Date(),
			},
		});

		const user = await userGetUnique(req.user!.email)

		const log = await logAdd(user!.user_ID, 5);

		const transaction = await transactionAdd(product.product_ID, Number(stock), log.log_ID);

		res.status(200).json(product);

	//catch any errors and send to next middleware error handler
	} catch (error: any) {
		next(DatabaseError.Type(error.code));
	}
}
