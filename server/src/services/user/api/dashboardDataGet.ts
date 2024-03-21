/**
 * @file dashboardDataGet.ts
 * @description This file contains the route for getting the data necessary for the dashboard of a product based on list of transactions
 */

//explicit Prisma dependency
import prisma from "../../../repositories/prismaClient.js";
import productSale from "../../controllers/product/productSale.js";
import DatabaseError from "../../error/databaseError.js";

export default async function (product_ID:any) {
	try {
        const id = Number(product_ID);
		const product = await prisma.product.findUnique({
			where: {
				product_ID: id
			}
		});

        var sell_price = product.sell_price;
        var transactions = product.transaction;
        var day_sale = [];
        var rows = [];

        // get sales throughout a month (i.e. 30 days)
        for (var i = transactions.length; i < transactions.length - 30; i--){
            day_sale[0] = transactions[i].log_ID;
            day_sale[1] = transactions[i].Amount * sell_price;
            rows.push(day_sale);
        }

        return {
            header: ["Log ID", "Sales"],
            rows: rows
        };

	} catch (error : any) {
		throw DatabaseError.Type(error.code);
	}
}