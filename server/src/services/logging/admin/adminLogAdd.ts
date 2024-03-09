/**
 * @file adminLogAdd.ts
 * @description Add a admin log to created/modified users
 */

import prisma from "../../../repositories/prismaClient.js";

export default async (log_ID: number, target_user_ID: number) => {
	try {

		const admin_log = await prisma.admin_user_log.create({
			data: {
					log:{
						connect:{
							log_ID: log_ID
						}
					},
					user: {
						connect:{
							user_ID: target_user_ID
						}
					}

			}
		})

		return admin_log;
	} catch (error : any) {
		console.log(error)
		throw error;
	}
}