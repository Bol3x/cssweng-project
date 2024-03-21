/**
 * @file settings.ts
 * @description This file contains all the settings and dependencies for the application
 */
import express, { Express } from 'express';
import cors from 'cors';
import methodOverride from 'method-override';

import flash from 'express-flash';
import session from 'express-session';
import passport from 'passport';
import rateLimit from 'express-rate-limit';

import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

//user type
declare global {
	namespace Express {
	  interface User {
		email: string;
	  }

	  interface InputError extends Error{
		code: number
	  }
	}
  }

const corsOptions = {
	origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
	credentials: true,
	optionsSuccessStatus: 200,
}

export const loadMiddlewares = (app: Express) => {
	app.use(cors(corsOptions));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(methodOverride('_method'));

	//user authentication
	app.use(flash());
	app.use(
		session({
			secret: process.env.SESSION_SECRET ?? 'secret',
			resave: false,
			saveUninitialized: false,
			cookie: {
				secure: false,
				maxAge: 1000 * 60 * 60 * 24, // 1 day
			}
	}));
	app.use(passport.session());
	app.use(passport.initialize());

	//set path to build folder
	app.set('view engine', 'ejs');
	app.use(express.static('views'));
}

/*
    Locks out IP address from logging after recognizing repeated requests or login attempts
*/
export const loginRateLimiter = rateLimit({
	windowMs: 4 * 60 * 60 * 1000,         //window size = 4 hours
	max: 20,                              //max of 20 REQUESTS within the window
	message: 'Multiple failed login attempts detected. Login disabled for 4 hours', 
	standardHeaders: true,
	legacyHeaders: false,
	skipSuccessfulRequests: true          //successful logins don't count towards the request limit
  });