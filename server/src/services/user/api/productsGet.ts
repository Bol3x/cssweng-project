/**
 * @file productsGet.ts
 * @description This file contains the route for getting all products from the database
 */

//explicit Prisma dependency
import prisma from "../../../repositories/prismaClient.js";
import DatabaseError from "../../error/databaseError.js";

export default async () => {
	try {
		const product = await prisma.product.findMany();
		return product
	} catch (error : any) {
		throw DatabaseError.Type(error.code);
	}
}