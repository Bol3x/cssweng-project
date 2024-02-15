/**
 * @file usertypeRoutes.ts
 * @description This file contains all routes for usertype-related services
 */

import express, { Express } from 'express';

import usertypeAdd from '../services/user/usertype/usertypeAdd.js';
import usertypeGet from '../services/user/usertype/usertypeGet.js';


const UserTypeRouter = express.Router();

UserTypeRouter.get('/', (req, res) => {
	res.render('addUserType');
});

UserTypeRouter.get('/get', usertypeGet);
UserTypeRouter.post('/add', usertypeAdd);

export default UserTypeRouter;