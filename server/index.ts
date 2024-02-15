/**
 * @file index.ts
 * @description This file is the entry point of the application
 */
import express, {Express} from 'express';
import passport from 'passport';

//custom imports
import { loadMiddlewares } from './settings.js';
import { LoadRoutes } from './src/routes/mainRoute.js';
import initializePassport from './src/services/user/auth/passport/passport-config.js';

initializePassport(passport);

const PORT = process.env.PORT || 3001;

const app: Express = express();

app.listen(PORT, () => {
	  console.log(`Server is running on port ${PORT}`);
});

loadMiddlewares(app);
LoadRoutes(app);