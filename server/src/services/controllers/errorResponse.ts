/**
 * @fileoverview Error response handler
 * @description This file contains the error response handler for all routes
 */
import { Request, Response, NextFunction } from 'express';
import { unlink } from 'fs';

export default function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
	
	//remove file if upload
	if (req.file){
		unlink(req.file.path, (err2) =>{
			if (err2 !== undefined) console.log(err2)
			
			console.log("File has been deleted.");
		})
	}
	
	//log the error
	console.log("error handler:");
	console.log(err);
	//send the error response
	if (process.env.NODE_ENV === "production")
		//res.status(400).render('message', {message: err.message});
		res.status(400).render('message', {message: "An error has occurred. Please double check your input, or contact your administrator."});
	else
		res.status(400).render('message', {message: err});
}