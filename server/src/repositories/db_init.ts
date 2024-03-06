//initial data fill for first admin

import userAdd from "../services/user/api/userAdd.js";
import prisma from "./prismaClient.js";

prisma.user_category.createMany({
	data:[
		{utype_title: "Admin"},
		{utype_title: "Employee"},
	],
}).then(() => {
	userAdd({
		name: "admin",
		email: 'test_admin@domain',
		password: "Abc123",
		utype_title: "Admin",
		phone_num: "001234567890",
	});
});

prisma.transaction_category.createMany({
	data: [
			{trtype_name: "Sales"},
			{trtype_name: "Restocks"}
	]
});