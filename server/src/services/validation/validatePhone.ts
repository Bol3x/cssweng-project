// checks if the phone number is valid
// mainly checks input format of the number

export default function validatePhone(number: string){
	try{
		//mobile number

		//todo: check country code for phone number
		if (!number.search(/^[0-9]{11}$/gm))
			return true;
	}
	catch(err){
		throw err;
	}
}	