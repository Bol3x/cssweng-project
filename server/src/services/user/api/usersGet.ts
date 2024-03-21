/**
 * @file usersGet.ts
 * @description This file contains the route for getting all users from the database
 */

//explicit Prisma dependency
import prisma from "../../../repositories/prismaClient.js";
import DatabaseError from "../../error/databaseError.js";

export default async () => {
	try {
		const user = await prisma.user.findMany();
		return user
	} catch (error : any) {
		throw DatabaseError.Type(error.code);
	}
}