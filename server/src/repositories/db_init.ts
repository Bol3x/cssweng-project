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

prisma.$executeRaw`TRUNCATE TABLE log;`.then(() => {});
prisma.$executeRaw`ALTER TABLE log AUTO_INCREMENT = 1;`.then(() => {});

prisma.$executeRaw`TRUNCATE TABLE log_category;`.then(() => {});
prisma.$executeRaw`ALTER TABLE log_category AUTO_INCREMENT = 1;`.then(() => {});

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

prisma.log_category.createMany({
	data: [
			{trtype_name: "Sale"},
			{trtype_name: "Restock"},
			
			{trtype_name: "Create Product"},
			{trtype_name: "Read Product"},
			{trtype_name: "Update Product"},
			{trtype_name: "Delete Product"},

			{trtype_name: "Create User"},
			{trtype_name: "Read User"},
			{trtype_name: "Update User"},
			{trtype_name: "Delete User"},
	],
}).then(() => {});