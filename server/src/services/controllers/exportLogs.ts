/**
 * @file exportLogs.ts
 * @description exports logs into 3 csv files - transactions, authentications, admin actions
 * These files are stored in 
 */

import {Request, Response, NextFunction } from "express";
import prisma from "../../repositories/prismaClient.js";
import exportLogs from "../logging/admin/exportLogs.js";


import fs from "fs";
import exportToCSV from "../logging/exportToCSV.js";

export default async (req: Request, res: Response, next: NextFunction) => {
	const log_types = req.body.types;

	try{
		const logs = await exportLogs(log_types);

	
		if (logs.transaction!.length !== 0){
			//console.log("transaction");
			//console.log(logs.transaction);
	
		}
	
		if (logs.auth!.length !== 0){
			//console.log("auth");
			//console.log(logs.auth, 'auth');
	
		}

		if (logs.admin!.length !== 0){
			//console.log("admin");
			//console.log(logs.admin);

		}


	res.status(200).end();


	}catch(err){
		next(err);
	}
}