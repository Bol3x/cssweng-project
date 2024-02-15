
import prisma from "../../../repositories/prismaClient.js";

export default async function userGetUnique(email:string){
	try{
		const user = await prisma.user.findUnique({
			where: {
				email: email
			},
			include: {
				user_category: true,
			}
		});

		return user
	}
	catch(err){
		throw err;
	}
	
}