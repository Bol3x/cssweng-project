//checks if new product data is valid
//passes to next if valid, throws the first error found if invalid

import { Request, Response, NextFunction } from 'express';
import { unlink } from 'fs';


export default async (req: Request, res: Response, next: NextFunction) => {
	try{

		console.log("validating products")
		const { name, price, stock, description, category, brand} = req.body;
		//validate inputs
		if (name === undefined || name === "") throw new Error("Name is undefined")
		if (price === undefined || price === "") throw new Error("Price is undefined")
		if (stock === undefined || stock === "") throw new Error("Stock is undefined")
		if (category === undefined || category === "") throw new Error("Category ID is undefined")
		if (brand === undefined || brand === "") throw new Error("Brand is undefined")
		
		next();

	} catch(err){
		next(err)
	}
}