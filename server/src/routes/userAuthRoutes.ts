/**
 * @file userAuthRoutes.ts
 * @description This file contains all routes for user authentication-related services
 */

import express from 'express';
import passport from 'passport';

import userCheckAuth from '../services/user/auth/userCheckAuth.js';
import userNoAuth from '../services/user/auth/userNoAuth.js';
import { verifyAuth } from '../services/user/auth/verifyAuth.js';
import verifyAdmin from '../services/user/auth/verifyAdmin.js';

import { loginRateLimiter } from '../services/middlewares/rateLimiter.js';
import { sessionTimer } from '../services/middlewares/sessionTimeout.js'

const UserAuthRouter = express.Router();

UserAuthRouter.get('/', (req, res) => {
	res.render('login');
})

UserAuthRouter.post('/verifyAdmin', verifyAdmin);

UserAuthRouter.get('/checkAuth', verifyAuth);

// Login Handle
UserAuthRouter.post('/login', userNoAuth, loginRateLimiter, passport.authenticate('login'), (req, res) => {
	sessionTimer.start();
	console.log("Logged in user");
	res.redirect("index");
	//@ts-ignore
	//res.status(200).json({message: "Successfully Logged in.", userdata: {name: req.user.name, email: req.user.email, expiry: req.session.cookie.expires}});
});


// Logout Handle
UserAuthRouter.post('/logout', userCheckAuth, (req, res, next) => {
	req.logOut((err) => {
		if (err) return next(err);
		res.redirect("/")
		//res.status(200).json({message: "Successfully Logged out."});
		console.log("Logged out user");
	});
});

sessionTimer.onTimeOut = () => {
	UserAuthRouter.post('/logout', userCheckAuth, (req, res, next) => {
		req.logOut((err) => {
			if (err) return next(err);
			res.redirect("/")
			//res.status(200).json({message: "Successfully Logged out."});
			console.log("Session expired. Logged out user");
		});
	});
}

export default UserAuthRouter;