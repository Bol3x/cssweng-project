/**
 * @file productRestock.ts
 * @description This file contains the route for editing an existing product in the database (adding stock)
 */

import { Request, Response, NextFunction } from "express";

import DatabaseError from "../../error/databaseError.js";

import prisma from "../../../repositories/prismaClient.js";
import transactionAdd from "../../logging/transactions/transactionAdd.js";
import userGetUnique from "../../user/api/userGetUnique.js";
import logAdd from "../../logging/logAdd.js";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		//get the product id from the request parameters
		const { stock, id } = req.body;

		if (stock === '' || stock === undefined) throw new Error("Stock is undefined");
		if (id === '' || id === undefined) throw new Error("ID is undefined")

		const product_data = await prisma.product.findFirstOrThrow({
			where: {
				product_ID: Number(id)
			},
			select: {
				stock: true,
				sell_price: true,
			}
		});

		//update the product
		const product = await prisma.product.update({
			where: {
				product_ID: Number(id),
			},
			data: {
				stock: product_data.stock + Number(stock),
				avg_value: Number(product_data.sell_price) * (product_data.stock + Number(stock)),
				last_updated: new Date(),
			},
		});

		//@ts-ignore
		const user = await userGetUnique(req.user.email)

		const log = await logAdd(user!.user_ID, 2);

		if (req.file !== undefined)
			await transactionAdd(product.product_ID, Number(stock), log.log_ID, req.file.path);

		else await transactionAdd(product.product_ID, Number(stock), log.log_ID);

		res.status(200).json(product);
	//catch any errors and send to next middleware error handler
	} catch (error: any) {
		console.log(error)
		next(DatabaseError.Type(error.code));
	}
}
