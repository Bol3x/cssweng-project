/**
 * @file categoryGet.ts
 * @description This file contains the route for getting a category from the database
 */

//explicit Prisma dependency
import prisma from "../../../repositories/prismaClient.js";
import DatabaseError from "../../error/databaseError.js";

export default async () => {
	try {
		const categories = await prisma.product_category.findMany();
		return categories
	} catch (error : any) {
		console.log(error)
		throw DatabaseError.DBError(error.code);
	}
}