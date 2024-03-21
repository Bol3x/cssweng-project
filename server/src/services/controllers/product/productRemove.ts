/**
 * @file productRemove.ts
 * @description This file contains the route for removing a product from the database
 */

import { Request, Response, NextFunction } from "express";

import prisma from "../../../repositories/prismaClient.js";
import DatabaseError from "../../error/databaseError.js";
import logAdd from "../../logging/logAdd.js";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { idList } = req.body;

		const products_to_delete = await prisma.product.findMany(
			{
				where: {
					product_ID: {
						in: idList
				}
			}
		});

		const product = await prisma.product.deleteMany({
			where: {
				product_ID: {
					in: idList,
				}
			},
		});


		//@ts-ignore
		const user = await userGetUnique(req.user.email)

		var deleted_items : string = "Deleted items: ";
		products_to_delete.forEach((product) => {
			deleted_items = deleted_items + " " + product.name;
		})
		const log = await logAdd(user!.user_ID, 6, deleted_items);

		
		

		res.status(200).json(product);
	} catch (error: any) {
		next(DatabaseError.Type(error.code));
	}
};