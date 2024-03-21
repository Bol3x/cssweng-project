/**
 * @file userDelete.ts
 * @description This file contains the route for deleting a user from the database
 */

import { Request, Response, NextFunction } from "express";

import DatabaseError from "../../../error/databaseError.js";

import prisma from "../../../../repositories/prismaClient.js";
import logAdd from "../../../logging/logAdd.js";
import adminLogAdd from "../../../logging/admin/adminLogAdd.js";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email } = req.params;
		console.log(req.params)
		const user = await prisma.user.delete({
			where: {
				email,
			},
		}); 

		//@ts-ignore
		const caller = await userGetUnique(req.user.email);

		const log = await logAdd(caller!.user_ID, 9);

		const admin_log = await adminLogAdd(log.log_ID, user.user_ID);

		res.status(200).json(user);
	} catch (error : any) {
		console.log(error)
		next(DatabaseError.Type(error.code));
	}
}
