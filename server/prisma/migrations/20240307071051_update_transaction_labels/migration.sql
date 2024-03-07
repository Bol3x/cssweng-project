/*
  Warnings:

  - The primary key for the `transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `product_id` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `tr_id` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `product_ID` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tr_ID` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` DROP PRIMARY KEY,
    DROP COLUMN `product_id`,
    DROP COLUMN `tr_id`,
    ADD COLUMN `product_ID` INTEGER NOT NULL,
    ADD COLUMN `tr_ID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`tr_ID`);
