import prisma from "../../../repositories/prismaClient.js";

export default async function usertypeGetUnique(type_id: number){
	try{
		const usertype = await prisma.user_category.findUnique({
			where: {
				utype_ID: type_id,
			}
		});
			
		return usertype;
	}
	catch(err){
		throw err;
	}
}