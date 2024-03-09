/**
 * @file userAdd.ts
 * @description This file contains the route for adding a user to the database
 */

import { Request, Response, NextFunction } from "express";
import { unlink } from 'fs';

import DatabaseError from "../error/databaseError.js";

import  userAdd  from "./api/userAdd.js";
import userGetUnique from "./api/userGetUnique.js";
import logAdd from "../logging/logAdd.js";
import adminLogAdd from "../logging/admin/adminLogAdd.js";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		//combine req.body with usertype string into one object
		const data = { ...req.body, img: req.file?.path, utype_title: "Employee"}
		data.email = data.email.toLowerCase();
		
		const user = await userAdd(data);

		console.log("added user: ")
		console.log(user)
		res.status(200).render("message", {message: "User Successfully created"});

		//@ts-ignore
		const creator = await userGetUnique(req.user.email);

		const log = await logAdd(creator!.user_ID, 7);

		const admin_log = await adminLogAdd(log.log_ID, user.user_ID);

		res.status(200).json(user);
	} catch (error : any) {
		if (req.file)
			unlink(req.file.path, (err)=>{
				console.log("file has been deleted.")
		});
		console.log(error)
		next(DatabaseError.DBError(error.code));
	}
}