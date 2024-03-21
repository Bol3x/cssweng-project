/**
 * @file mainRoute.ts
 * @description This file contains the main routes for the application
 */
import { Router } from 'express';

import ProductRouter from './productRoutes.js';
import CategoryRouter from './categoryRoutes.js';
import UserRouter from './userRoutes.js';
import UserAuthRouter from './userAuthRoutes.js';

import ErrorHandler from '../services/controllers/errorResponse.js';

import userCheckAuth from '../services/controllers/user/authentication/userCheckAuth.js';
import userCheckAdmin from '../services/controllers/user/authentication/userCheckAdmin.js';
import exportLogs from '../services/controllers/exportLogs.js';

export const LoadRoutes = (app: Router) => {

	app.use('/product', userCheckAuth, ProductRouter);
	app.use('/category', userCheckAuth, CategoryRouter);
	app.use('/user', userCheckAuth, userCheckAdmin, UserRouter);
	app.use('/auth', UserAuthRouter);

	app.use(ErrorHandler);

	//main route to react app
	app.get('/', (req, res) => {
		if (req.isAuthenticated()){
			//@ts-ignore
			res.render('index', {name:  req.user.name});
		}
		else
			res.render('login')
	})

	//redirect all other routes to index
	app.use('/*', (req, res) => {
		res.redirect('/');
	});
};