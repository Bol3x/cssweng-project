/**
 * @file productRoutes.ts
 * @description This file contains all the routes for product operations
 */
import express, { Router } from 'express';

//services - function request handlers for each route
import productAdd from '../services/products/productAdd.js';
import productGet from '../services/products/productGet.js';
import productEdit from '../services/products/productEdit.js';
import productDelete from '../services/products/productRemove.js';

import userCheckAdmin from '../services/user/auth/userCheckAdmin.js';
import categoryGet from '../services/products/category/categoryGet.js';

const ProductRouter: Router = express.Router();

ProductRouter.get('/add', (req, res) => {
	categoryGet().then((categories: any) =>{
		res.render('addproduct', {categories: categories});
	})
});

ProductRouter.post('/add', userCheckAdmin, productAdd);
ProductRouter.get('/get', productGet);
ProductRouter.put('/:id', productEdit);
ProductRouter.delete('/remove', userCheckAdmin, productDelete);

export default ProductRouter;