/**
 * @file transactionAdd.ts
 * @description Add a transaction log to the database
 */

import prisma from "../../../repositories/prismaClient.js";

export default async (product_id: number, stock: number, log_id: number) => {
	try {

		const transaction = await prisma.transaction.create({
			data: {
					Amount: stock,
					log: {
						connect: {
							log_ID: log_id
						}
					},
					product: {
						connect: {
							product_ID: product_id
						}
					},

			}
		})

		return transaction;
	} catch (error : any) {
		console.log(error)
		throw error;
	}
}