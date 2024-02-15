/**
 * @file settings.ts
 * @description contains all user routes involving logging in, logging out, and registering new users
 */

import express, { Express } from 'express';
import multer from "multer";

import userAddEmployee from '../services/user/userAddEmployee.js';
import userGet from '../services/user/userGetEmployees.js';
import userRemove from '../services/user/userRemove.js';

import UserTypeRouter from './usertypeRoutes.js';
import validateUserdata from '../services/validation/validateUserdata.js';
import verifyAdmin from '../services/user/auth/verifyAdmin.js';

//
const whitelist_filetypes = [
	'image/png',
	'image/jpeg',
	'image/jpg',
	'image/webp'
  ]

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
	  
	fileFilter: (req, file, cb) => {
	if (!whitelist_filetypes.includes(file.mimetype)) {
		return cb(new Error('file is not allowed'))
	}

	cb(null, true)
	}
})

const UserRouter = express.Router();

UserRouter.use('/type', UserTypeRouter);

UserRouter.get('/', (req, res) => {
	res.render('adduser');
});

UserRouter.get('/get', userGet);
UserRouter.post('/add', upload.single('img'), validateUserdata(whitelist_filetypes),/*, userAddEmployee */ (req,res) =>{
	console.log("added user");
	res.send("User has been added");
});

UserRouter.post('/check', verifyAdmin);
UserRouter.delete('/:email', userRemove);

export default UserRouter;