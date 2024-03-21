/**
 * @file categoryAdd.ts
 * @description This file contains the route for adding a category to the database
 */

//explicit Prisma dependency
import prisma from "../../../../repositories/prismaClient.js";

import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (req.body.name === "") throw new Error("Name is undefined");
		const category = await prisma.product_category.create({
			data: {
				name: req.body.name,
			},
		});
		res.json(category);
	} catch (error) {
		next(error);
	}
}