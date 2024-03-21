/**
 * @file categoryDelete.ts
 * @description This file contains the route for editing a category from the database
 */

//explicit Prisma dependency
import prisma from "../../../../repositories/prismaClient.js";

import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const { name } = req.body;

		if (id === "" || id === undefined) throw new Error("ID is undefined");
		if (name === "" || name === undefined) throw new Error("Name is undefined");

		const category = await prisma.product_category.update({
			where: {
				category_ID: Number(),
			},
			data: {
				name: name,
			},
		});
		res.json(category);
	} catch (error) {
		next(error);
	}
}