//import passport-local
import { Strategy as LocalStrategy } from 'passport-local';

import userGetUnique from '../../api/userGetUnique.js';
import { authenticateUser } from './authenticateUser.js';
import { user } from '@prisma/client';
import DatabaseError from '../../../error/databaseError.js';

export default function initializeUser(passport: any): void {

	passport.use('login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
	}, authenticateUser));

	passport.serializeUser((user: user, done: any) => {
		done(null, {email: user.email, name: user.name}) 
	});
	passport.deserializeUser((user_session: any, done: any) => {
			done(null, user_session)
	});
}