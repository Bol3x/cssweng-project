//checks if new user data is valid
//passes to next if valid, throws an error if invalid

import { Request, Response, NextFunction } from 'express';
import { unlink } from 'fs';

import validatePassword from './validatePassword.js';
import validateEmail from './validateEmail.js';
import validateName from './validateName.js';
import validatePhone from './validatePhone.js';
import validateUpload from './validateUpload.js';

export default (whitelist: Array<string>) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try{

			console.log("Validating user information")
			let { name, password, email, phone_num } = req.body;
			email = email.toLowerCase();

			console.log('Validating username')
			const isNameValid = validateName(name);

			console.log('Validating email')
			const isEmailValid = await validateEmail(email);

			console.log('Validating password')
			const isPasswordValid = validatePassword(password);

			console.log('Validating phone num')
			const isPhoneValid = validatePhone(phone_num);

			console.log('Validating icon')
			const isFileValid = await validateUpload(req.file?.path, whitelist);


			console.log("Final check")
			//edge case
			if (email === password.toLowerCase()) throw new Error('The Email cannot be your password!!!');

			if (isNameValid && isPasswordValid && isEmailValid && isPhoneValid && isFileValid) 
				next();
		} catch(err){
			if (req.file){
				unlink(req.file.path, (err) =>{
					console.log("file has been deleted.");
				})
			}
			console.log(err);
			next(err)
		}
	}
}