/**
 * @file mainRoute.ts
 * @description This file contains the main routes for the application
 */
import { Router } from 'express';

import ProductRouter from './productRoutes';
import CategoryRouter from './categoryRoutes';
import UserRouter from './userRoutes';
import UserAuthRouter from './userAuthRoutes';

import ErrorHandler from '../services/error/errorResponse';

import userCheckAuth from '../services/user/auth/userCheckAuth';
import userCheckAdmin from '../services/user/auth/userCheckAdmin';

export const LoadRoutes = (app: Router) => {

	app.use('/product', userCheckAuth, ProductRouter);
	app.use('/category', userCheckAuth, CategoryRouter);
	app.use('/user', userCheckAuth, userCheckAdmin, UserRouter);
	app.use('/auth', UserAuthRouter);

	//index is in build, from react app in `client`

	app.use(ErrorHandler);

	//redirect all other routes to index
	app.get('*', (req, res) => {
		res.sendFile('index.html', {root: 'build'});
	})
};