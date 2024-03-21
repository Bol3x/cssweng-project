/**
 * @file userAuthRoutes.ts
 * @description This file contains all routes for user authentication-related services
 */

import express from 'express';
import passport from 'passport';

import userCheckAuth from '../services/controllers/user/authentication/userCheckAuth.js';
import userNoAuth from '../services/controllers/user/authentication/userNoAuth.js';
import { verifyAuth } from '../services/controllers/user/authentication/verifyAuth.js';
import verifyAdmin from '../services/controllers/user/authentication/verifyAdmin.js';

import { loginRateLimiter } from '../../settings.js';
import userGetUnique from '../services/user/api/userGetUnique.js';
import logAdd from '../services/logging/logAdd.js';

const UserAuthRouter = express.Router();

UserAuthRouter.get('/', (req, res) => {
	res.render('login');
})

UserAuthRouter.post('/verifyAdmin', verifyAdmin);

UserAuthRouter.get('/checkAuth', verifyAuth);

// Login Handle
UserAuthRouter.post('/login', userNoAuth, loginRateLimiter, passport.authenticate('login'), async (req, res, next) => {
	console.log("Logged in user");

	const user = await userGetUnique(req.user!.email)

	if (user != undefined){
		const log = await logAdd(user.user_ID, 11);
	}
	else return next(new Error("Authenticated User does not exist?!"));

	res.redirect("index");
	//res.status(200).json({message: "Successfully Logged in.", userdata: {name: req.user.name, email: req.user.email, expiry: req.session.cookie.expires}});
});


// Logout Handle
UserAuthRouter.post('/logout', userCheckAuth, async (req, res, next) => {

	const user = await userGetUnique(req.user!.email)

	if (user != undefined){
		const log = await logAdd(user.user_ID, 12);
	}
	else return next(new Error("User doesn't exist...?"));

	req.logOut((err) => {
		if (err) return next(err);

		console.log(req.user);
		res.redirect("/")
		//res.status(200).json({message: "Successfully Logged out."});
		console.log("Logged out user");
	});
});

export default UserAuthRouter;