/**
 * @file productRoutes.ts
 * @description This file contains all the routes for product operations
 */
import express, { Router } from 'express';

//services - function request handlers for each route
import productAdd from '../services/controllers/product/productAdd.js';
import productGet from '../services/controllers/product/productGet.js';
import productDelete from '../services/controllers/product/productRemove.js';

import productEdit from '../services/controllers/product/productEdit.js';
import productRestock from '../services/controllers/product/productRestock.js';
import productSale from '../services/controllers/product/productSale.js';

import userCheckAdmin from '../services/controllers/user/authentication/userCheckAdmin.js';
import categoryGet from '../services/user/api/categoryGet.js';
import validateProducts from '../services/validation/validateProducts.js';

import productsGet from '../services/user/api/productsGet.js';

const ProductRouter: Router = express.Router();

ProductRouter.get('/', (req, res) => {
	productsGet().then((product: any) =>{
		res.render('viewproducts', {product: product});
	})
});

ProductRouter.get('/add', (req, res) => {
	categoryGet().then((categories: any) =>{
		res.render('addproduct', {categories: categories});
	})
});

ProductRouter.get('/update', (req, res) => {
	productsGet().then((product: any) =>{
		res.render('updateproduct', {product: product});
	})
});

ProductRouter.post('/add', userCheckAdmin, validateProducts, productAdd);
ProductRouter.get('/get', productGet);
ProductRouter.put('/:id', validateProducts, productEdit);
ProductRouter.put('/restock/:id', productRestock);
ProductRouter.put('/sale/:id', productSale);
ProductRouter.delete('/remove', userCheckAdmin, productDelete);

export default ProductRouter;