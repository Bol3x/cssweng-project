/**
 * @file logAdd.ts
 * @description Add a log to the database
 */

import prisma from "../../repositories/prismaClient.js";

export default async (user_id : number, type: number, details: string = '') => {
	try {

		const log = await prisma.log.create({
			data: {
					source_ID: user_id,
					Date: new Date(),
					log_type: type,
					Details: details
			}
		})

		return log;
	} catch (error : any) {
		console.log(error)
		throw error;
	}
}