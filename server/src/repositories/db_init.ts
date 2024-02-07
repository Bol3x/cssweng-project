//initial data fill for first admin

import userAdd from "../services/user/api/userAdd";
import prisma from "./prismaClient";

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
