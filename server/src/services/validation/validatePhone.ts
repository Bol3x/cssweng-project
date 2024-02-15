// checks if the phone number is valid
// mainly checks input format of the number

export default function validatePhone(number: string){

	/*
		PHONE REGEX GUIDE:

		[1]		(?:\+?(\d{1,3}))?		country code		optional
		[2]		(\d{3})?            	area code			optional
		[3]		(\d{3})             	exchange code		required
		[4]		(\d{4})             	subscriber number	required
		[5]		(?: *x(\d+))?       	extension number	optional

		Groups can be divided with either spaces or dashes
	*/

	const phoneRe = new RegExp(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})?[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/);
	
	try{

		if (!(number.search(phoneRe)) == false) throw new Error("Invalid phone number. Please enter a valid phone number.");
		return true
	}
	catch(err){
		throw err;
	}
}	