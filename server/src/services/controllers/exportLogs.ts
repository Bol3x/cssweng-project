/**
 * @file exportLogs.ts
 * @description exports logs into 3 csv files - transactions, authentications, admin actions
 */

import {Request, Response, NextFunction } from "express";
import prisma from "../../repositories/prismaClient.js";
import exportLogs from "../logging/admin/exportLogs.js";

import fs from "fs";
import exportToCSV from "../logging/exportToCSV.js";

export default async (req: Request, res: Response, next: NextFunction) => {
	const log_types = [1,2,3,4,5,6,7,8,9,10,11,12]

	try{
		const logs = await exportLogs(log_types);

	
		if (logs.transaction!.length !== 0){
			//console.log("transaction");
			//console.log(logs.transaction);
	
			const filename = exportToCSV(logs.transaction, 'transaction');
		}
	
		if (logs.auth!.length !== 0){
			//console.log("auth");
			//console.log(logs.auth, 'auth');
	
			const filename = exportToCSV(logs.auth, 'authentication');
		}

		if (logs.admin!.length !== 0){
			//console.log("admin");
			//console.log(logs.admin);
	
			const filename = exportToCSV(logs.admin, 'Admin');
		}


	}catch(err){
		next(err);
	}
}