# 9 Works Inventory Management System

Developed By Team 1 - CSSWENG S11
This was a project for 9 Works Hardware, in fulfillment of the CSSWENG course.

This project is being reworked to incorporate stronger security measures, as part of the CSSECDV course.

This program is an inventory management system for use of 9 Works Hardware.

Developed in Express, this application allows the user to add, edit, search, and remove products.
Admins are provided full access to the database contents and can add new employees into the system, 
while employees can only view and edit existing products.

Prerequisites:
NodeJS
MySQL Server

For testing:
install all dependencies on the `server` folder using ``npm install`` on their directories.
initialize the database to your system by first calling `npx prisma migrate dev --name init`, 
and then call `npm run init-db` to initialize the database with an initial admin account.

in the .env file, ensure that the contents adhere to the credentials of the root (i.e. change the password to the password set of the root local instance of the database)

On the Server directory:
Call `npm run start` within the server folder and open the application through `https://localhost:3001`
