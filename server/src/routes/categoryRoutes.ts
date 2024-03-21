/**
 * @file categoryRoutes.ts
 * @description This file contains all the routes for product category operations
 */
import express, { Router } from 'express';

//services - function request handlers for each route
import categoryAdd from '../services/controllers/product/categories/categoryAdd.js';
import categoryGet from '../services/user/api/categoryGet.js';
import categoryEdit from '../services/controllers/product/categories/categoryEdit.js';
import categoryDelete from '../services/controllers/product/categories/categoryRemove.js';


import userCheckAdmin from '../services/controllers/user/authentication/userCheckAdmin.js';

const CategoryRouter: Router = express.Router();

CategoryRouter.get('/add', userCheckAdmin, (req, res) => {
	res.render('addCategory');
});

CategoryRouter.post('/add', userCheckAdmin, categoryAdd);
CategoryRouter.get('/get', categoryGet);
CategoryRouter.put('/:id', userCheckAdmin, categoryEdit);
CategoryRouter.delete('/:id', userCheckAdmin, categoryDelete);

export default CategoryRouter;