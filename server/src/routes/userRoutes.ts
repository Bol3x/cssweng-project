/**
 * @file settings.ts
 * @description contains all user routes involving logging in, logging out, and registering new users
 */

import express, { Express } from 'express';
import multer from "multer";

import userAddEmployee from '../services/controllers/user/crud/userAddEmployee.js';
import userGet from '../services/controllers/user/crud/userGetEmployees.js';
import userRemove from '../services/controllers/user/crud/userRemove.js';

import validateUserdata from '../services/validation/validateUserdata.js';
import verifyAdmin from '../services/controllers/user/authentication/verifyAdmin.js';

import usersGet from '../services/user/api/usersGet.js';

//
const whitelist_filetypes = [
	'image/png',
	'image/jpeg',
	'image/jpg',
	'image/webp'
  ]

const maxSize = 1 * 1024 * 1024; //1MB

//multer config
//probably change destination to a web storage in prod
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
	if (!whitelist_filetypes.includes(file.mimetype)) {
		return cb(new Error('file is not allowed'))
	}

	cb(null, true)
	}
})

const UserRouter = express.Router();

UserRouter.get('/', (req, res) => {
	usersGet().then((user: any) =>{
		res.render('viewusers', {user: user});
	})
});

UserRouter.get('/add', (req, res) => {
	res.render('adduser');
});

UserRouter.get('/update', (req, res) => {
	usersGet().then((user: any) =>{
		res.render('updateuser', {user: user});
	})
});

UserRouter.get('/get', userGet);
UserRouter.post('/add', upload.single('img'), validateUserdata(whitelist_filetypes), userAddEmployee);

UserRouter.post('/check', verifyAdmin);
UserRouter.delete('/:email', userRemove);

export default UserRouter;