/**
 * @file index.ts
 * @description This file is the entry point of the application
 */
import express, {Express} from 'express';
import passport from 'passport';

// for https implementation
import { readFileSync } from 'fs';
import { createServer } from 'https';

//custom imports
import { loadMiddlewares } from './settings.js';
import { LoadRoutes } from './src/routes/mainRoute.js';
import initializePassport from './src/services/user/auth/passport/passport-config.js';

initializePassport(passport);

const PORT = process.env.PORT || 3001;

const app: Express = express();

// instantiate the ssl credentials 
const privateKey = readFileSync('./private/certs/selfsigned.key');
const certificate = readFileSync('./private/certs/selfsigned.crt');
const credentials = {key: privateKey, cert: certificate};

//  comment in-out of http version
/* 
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
*/

loadMiddlewares(app);
LoadRoutes(app);

const httpsServer = createServer(credentials, app);

// comment in-out of https mode
httpsServer.listen(PORT, () => {
	  console.log(`Server is running on port ${PORT}`);
});

