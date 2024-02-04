/** checks if user is an admin
 *  prevents access to pages that require admin privileges
 */

import { Request, Response, NextFunction } from 'express';
import usertypeGetUnique from '../api/usertypeGetUnique';
import { user, user_category } from '@prisma/client';
import userGetUnique from '../api/userGetUnique';

export default async function userCheckAdmin(req: Request, res: Response, next: NextFunction){

	try{
		//@ts-ignore
		userGetUnique(req.user.email).then((user : user) => {
			//@ts-ignore
			if (user.user_category.utype_title == "Admin")
				return next();

			res.status(401).send("You do not have access to this page.");
		})
	}
	catch(err){
		console.log(err);
		throw err;
	}
}