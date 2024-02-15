import prisma from "../../../repositories/prismaClient.js";
import bcryptjs from "bcryptjs";
import DatabaseError from "../../error/databaseError.js";

export default async function userAdd(data: any){
	try{
		
		const dupe = await prisma.user.findFirst({where: {email: data.email}});
		if (dupe){
			throw {code:"P2002"};
		}

		const hashedPassword = await bcryptjs.hash(data.password, 10);
		const user = await prisma.user.create({
			data: {
				name: data.name,
				email: data.email,
				pass: hashedPassword,
				phone_num: data.phone_num,
				profile_pic: data.img,
				date_created: new Date(),
				user_category: {
					connect: {
						utype_title: data.utype_title,
					}
				}
			}
		});

		return user;
	}
	catch(err){
		console.log(err);
		throw err;
	}
}