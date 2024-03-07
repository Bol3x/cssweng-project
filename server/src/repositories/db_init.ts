//initial data fill for first admin

import userAdd from "../services/user/api/userAdd.js";
import prisma from "./prismaClient.js";

console.log("resetting table data...")

//reset tables

prisma.$executeRaw`TRUNCATE TABLE user;`.then(() => {});
prisma.$executeRaw`ALTER TABLE user AUTO_INCREMENT = 1;`.then(() => {});

prisma.$executeRaw`TRUNCATE TABLE user_category;`.then(() => {});
prisma.$executeRaw`ALTER TABLE user_category AUTO_INCREMENT = 1;`.then(() => {});

prisma.$executeRaw`TRUNCATE TABLE transaction;`.then(() => {});
prisma.$executeRaw`ALTER TABLE transaction AUTO_INCREMENT = 1;`.then(() => {});

prisma.$executeRaw`TRUNCATE TABLE transaction_category;`.then(() => {});
prisma.$executeRaw`ALTER TABLE transaction_category AUTO_INCREMENT = 1;`.then(() => {});

console.log("generating table data...")

prisma.user_category.createMany({
	data:[
		{utype_title: "Admin"},
		{utype_title: "Employee"},
	],
}).then(() => {});

userAdd({
	name: "admin",
	email: 'test_admin@domain',
	password: "TestAdmin123",
	utype_title: "Admin",
	phone_num: "001234567890",
}).then(() => {});

prisma.transaction_category.createMany({
	data: [
			{trtype_name: "Sales"},
			{trtype_name: "Restocks"},
			{trtype_name: "New"},
			{trtype_name: "Update"},
	],
}).then(() => {});