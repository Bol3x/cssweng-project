# 9 Works Inventory Management System

Developed By Team 1 - CSSWENG S11
Updated with Security features for Group 1 - CSSECDV S11
This is a project for 9 Works Hardware, also in fulfillment of the CSSWENG course.

Currently hosted at Render: https://nineworks-inventory.onrender.com/

This program is an inventory management system for use of 9 Works Hardware.

Developed in Express, this application allows the user to add, edit, search, and remove products.
Also includes user-based permission for pages.

For testing:
install all dependencies on both `client` and `server` folders using ``npm install`` on their directories.

On the Server directory:
Run `npm run build`, then run `npm run start` and open the application through `https://localhost:3001`

For the database connection, place the link in a .env file and configure the table contents by calling `npx prisma migrate`, ad well as `npm run init-db` inside the server folder
