/**
 * @file categoryRoutes.ts
 * @description This file contains all the routes for product category operations
 */
import express, { Router } from 'express';

//services - function request handlers for each route
import categoryAdd from '../services/products/category/categoryAdd.js';
import categoryGet from '../services/products/category/categoryGet.js';
import categoryEdit from '../services/products/category/categoryEdit.js';
import categoryDelete from '../services/products/category/categoryRemove.js';


import userCheckAdmin from '../services/user/auth/userCheckAdmin.js';

const CategoryRouter: Router = express.Router();

CategoryRouter.get('/add', userCheckAdmin, (req, res) => {
	res.render('addCategory');
});

CategoryRouter.post('/add', userCheckAdmin, categoryAdd);
CategoryRouter.get('/get', categoryGet);
CategoryRouter.put('/:id', userCheckAdmin, categoryEdit);
CategoryRouter.delete('/:id', userCheckAdmin, categoryDelete);

export default CategoryRouter;