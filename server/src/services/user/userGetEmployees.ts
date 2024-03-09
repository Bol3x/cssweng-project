/**
 * @file userGet.ts
 * @description This file contains the route for getting a user from the database
 */

import { Request, Response, NextFunction } from "express";

import DatabaseError from "../error/databaseError.js";

import prisma from "../../repositories/prismaClient.js";
import logAdd from "../logging/logAdd.js";
import adminLogAdd from "../logging/admin/adminLogAdd.js";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await prisma.user.findMany({
			where: {
				NOT: {
					user_category: {
						utype_title:{
							equals: "Admin"
						}
					}
				}
			}
		});

		//@ts-ignore
		const caller = await userGetUnique(req.user.email);

		const log = await logAdd(caller!.user_ID, 9);

		users.forEach(async (user) => {
			const admin_log = await adminLogAdd(log.log_ID, user.user_ID);
		})
		

		res.json(users);
	} catch (error : any) {
		console.log(error)
		next(DatabaseError.DBError(error.code));
	}
}