import prisma from "../../../repositories/prismaClient.js";
import bcryptjs from "bcryptjs";
import DatabaseError from "../../error/databaseError.js";

export default async function productAdd(data: any){
	try{


		const product = await prisma.product.create({
			data: {
				name: data.name,
				sell_price: Number(data.price),
				stock : Number(data.stock),
				brand: data.brand,
				description: data.description,
				product_category: {
					connect: {
						category_ID: Number(data.category),
					}
				},
				avg_value: Number(data.price) * Number(data.stock),
				last_updated: new Date(),
			},
		});

		return product;
	}
	catch(err: any){
		throw DatabaseError.Type(err.code);
	}
}