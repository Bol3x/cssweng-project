/**
 * @file settings.ts
 * @description contains all user routes involving logging in, logging out, and registering new users
 */

import express, { Express } from 'express';

import userAddEmployee from '../services/user/userAddEmployee';
import userGet from '../services/user/userGetEmployees';
import userRemove from '../services/user/userRemove';

import UserTypeRouter from './usertypeRoutes';
import validateUserdata from '../services/middleware validation/validateUserdata';
import verifyAdmin from '../services/user/auth/verifyAdmin';
import userAddAdmin from '../services/user/userAddAdmin';

const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const UserRouter = express.Router();

UserRouter.use('/type', UserTypeRouter);

UserRouter.get('/', (req, res) => {
	res.render('adduser');
});

UserRouter.get('/get', userGet);
UserRouter.post('/add', validateUserdata, upload.single('file'), userAddEmployee);
UserRouter.post('/check', verifyAdmin);
UserRouter.delete('/:email', userRemove);

export default UserRouter;