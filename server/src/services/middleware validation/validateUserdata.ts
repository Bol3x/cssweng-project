//checks if new user data is valid
//passes to next if valid, throws an error if invalid

import { Request, Response, NextFunction } from 'express';

import validatePassword from '../validation/validatePassword';
import validateEmail from '../validation/validateEmail';
import validateName from '../validation/validateName';
import validatePhone from '../validation/validatePhone';

export default async (req: Request, res: Response, next: NextFunction) => {
	try{
		let { name, password, email, phone_num } = req.body;
		email = email.toLowerCase();

		const isNameValid = validateName(name);
		const isEmailValid = await validateEmail(email);
		const isPasswordValid = validatePassword(password);
		const isPhoneValid = validatePhone(phone_num)

		//edge case
		if (email === password.toLowerCase()) throw new Error('The Email cannot be your password!!!');

		if (isNameValid && isPasswordValid && isEmailValid && isPhoneValid) 
			next();
	} catch(err){
		console.log(err);
		next(err)
	}
}