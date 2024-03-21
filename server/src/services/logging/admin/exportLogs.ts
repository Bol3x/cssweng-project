/**
 * @file exportLogs.ts
 * @description exports json lists containing all logs of the given type/s
 */

import prisma from "../../../repositories/prismaClient.js"

type flat_transaction_log = {
	id: number, 
	user: string, 
	log_type: string, 
	date: Date,
	details: string | null,
	product_name: string, 
	amount_changed: number,
}

type flat_admin_log = {
	id: number,
	user: string,
	target_user: string,
	log_type: string,
	date: Date,
	details: string | null,
}

type flat_auth_log = {
	id: number,
	user: string,
	log_type: string,
	date: Date,
	details: string | null,
}


export default async (types: number[]) => {
	try{
		let tr_logs = null;
		const tr_log_types = new Set([1,2,3,4,5,6]);
		if (types.some(type => tr_log_types.has(type))){
			const log_types = types.filter(type => tr_log_types.has(type));

			tr_logs = await prisma.log.findMany({
				where:{
					log_type: {in: log_types}
				},
				include:{
					log_category: true,
					transaction: {
						select: {
							product: true,
							Amount: true,
						}
					},
					user: {
						select:{
							email: true,
						}
					}
				},
			})
		}

		
		let out_tr_logs : any[] = [];
		tr_logs?.forEach((log) => {
			const out_tr: flat_transaction_log = {
				id: log.log_ID,
				user: log.user.email,
				log_type: log.log_category.trtype_name,
				date: log.Date,
				details: log.Details,
				product_name: log.transaction[0].product.name,
				amount_changed: log.transaction[0].Amount,
			}

			out_tr_logs.push(out_tr);
		})



		var admin_logs = null;
		const admin_log_types = new Set([7,8,9,10]);
		if (types.some(type => admin_log_types.has(type))){
			const log_types = types.filter(type => admin_log_types.has(type));

			admin_logs = await prisma.log.findMany({
				where:{
					log_type: {in: log_types}
				},
				include:{
					log_category:true,
					admin_user_log: {
						include: {
							tgt_user: {
								select: {
									email:true,
								}
							},
						}
					},
					user: {
						select:{
							email: true,
						}
					}
				}
			})
		}

		console.log(admin_logs)

		let out_admin_logs : any[] = [];
		admin_logs?.forEach((log) => {
			const out_admin: flat_admin_log = {
				id: log.log_ID,
				user: log.user.email,
				target_user: log.admin_user_log[0].tgt_user.email,	//pk is fk for admin_user_log so only 1 exists
				log_type: log.log_category.trtype_name,
				date: log.Date,
				details: log.Details,
			}

			out_admin_logs.push(out_admin);
		})



		var auth_logs = null;
		const auth_log_types = new Set([11,12]);
		if (types.some(type => auth_log_types.has(type))){
			const log_types = types.filter(type => auth_log_types.has(type));

			auth_logs = await prisma.log.findMany({
				where:{
					log_type: {in: log_types}
				},
				include:{
					log_category:true,
					user: {
						select:{
							user_ID: true,
							name: true,
							email: true,
						}
					}
				}
			})
		}

		let out_auth_logs : any[] = [];
		auth_logs?.forEach(log => {
			const out_auth : flat_auth_log = {
				id: log.log_ID,
				user: log.user.email,
				log_type: log.log_category.trtype_name,
				details: log.Details,
				date: log.Date,
			} 
			out_auth_logs.push(out_auth);
		});


		return {"transaction": out_tr_logs, "admin": out_admin_logs, "auth": out_auth_logs}
	}
	catch(err){
		console.log(err)
		throw err
	}
}
