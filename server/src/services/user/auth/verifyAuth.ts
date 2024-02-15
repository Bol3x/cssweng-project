//send a message to user if a session exists for them in the server

import { Request, Response } from "express";

export const verifyAuth = async (req: Request, res: Response) => {
	if(req.isAuthenticated()){
		//@ts-ignore
		res.status(200).render("message", {message: "User is already logged in", userdata: req.user});
	}
	else{
		res.status(403).render("message", {message: 'You are not logged in'});
	}
} 