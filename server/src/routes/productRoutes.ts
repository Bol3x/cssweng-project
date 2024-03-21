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
import validateUpload from '../services/validation/validateUpload.js';
import multer from 'multer';

const file_whitelist = ['application/pdf',]

//multer config
const maxSize = 8 * 1024 * 1024; //8MB
const upload = multer({
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
		  cb(null, 'public/uploads')
		},
		filename: function (req, file, cb) {
		  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		  cb(null, file.fieldname + '-' + uniqueSuffix)
		}
	  }),

	limits: { fileSize: maxSize },
	  
	fileFilter: (req, file, cb) => {

	console.log("File: ");
	console.log(file);
	if (!file_whitelist.includes(file.mimetype)) {
		return cb(new Error('file is not allowed'))
	}

	cb(null, true)
	}
})

import { unlink } from 'fs';

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
ProductRouter.post('/restock', upload.single('receipt'), async (req,res,next) => {
	console.log("Uploading")
	try{
	  (req.file != undefined) ? await validateUpload(req.file?.path, file_whitelist) : true;
	  next();
	}catch(err){
		next(err);
	}

}, productRestock);
ProductRouter.post('/sale', productSale);
ProductRouter.delete('/remove', userCheckAdmin, productDelete);

export default ProductRouter;