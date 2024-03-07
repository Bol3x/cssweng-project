/**
 * @file productAdd.ts
 * @description This file contains the route for adding a product to the database
 */

import { Request, Response, NextFunction } from "express";

import DatabaseError from "../../error/databaseError.js";

import prisma from "../../../repositories/prismaClient.js";
import userGetUnique from "../../user/api/userGetUnique.js";

export default async (product_id: number, stock: number, user_id : number, type: number) => {
	try {

		const transaction = await prisma.transaction.create({
			data: {
					product_ID: product_id,
					sender: user_id,
					Date: new Date(),
					Amount: stock,
					transaction_category: {
						connect: {
							trtype_PID: type
						}
					}

			}
		})

		return transaction;
	} catch (error : any) {
		console.log(error)
		throw error;
	}
}