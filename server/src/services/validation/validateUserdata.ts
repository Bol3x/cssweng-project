//checks if new user data is valid
//passes to next if valid, throws an error if invalid

import { Request, Response, NextFunction } from 'express';

import validatePassword from './validatePassword.js';
import validateEmail from './validateEmail.js';
import validateName from './validateName.js';
import validatePhone from './validatePhone.js';
import validateUpload from './validateUpload.js';

export default (whitelist: Array<string>) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try{
			let { name, password, email, phone_num } = req.body;
			email = email.toLowerCase();

			const isNameValid = validateName(name);
			const isEmailValid = await validateEmail(email);
			const isPasswordValid = validatePassword(password);
			const isPhoneValid = validatePhone(phone_num);
			const isFileValid = await validateUpload(req.file?.path, whitelist);

			//edge case
			if (email === password.toLowerCase()) throw new Error('The Email cannot be your password!!!');

			if (isNameValid && isPasswordValid && isEmailValid && isPhoneValid && isFileValid) 
				next();
		} catch(err){
			console.log(err);
			next(err)
		}
	}
}