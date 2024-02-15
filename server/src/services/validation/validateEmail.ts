// checks if an email being used to register is valid
// returns true if valid, false if invalid

import { validate } from 'deep-email-validator';

export default async function validateEmail(email: string){

	const emailRe = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

	if (!(email.search(emailRe)) == false) throw new Error("Invalid email. Please enter a valid email address.");

	// second phase: checking the existence of the email
	else { 

		try{
			const { valid, reason, validators } = await validate({
				email,
				validateMx: false,
				validateDisposable: true,
				validateSMTP: false,
			});

			if (!valid) throw new Error("Invalid email. Please enter a valid email address.");
			return true;
		}
		catch(err){
			throw err;
		}
	}

}