/*
  Warnings:

  - The primary key for the `transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Date` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `Details` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `sender` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `tr_ID` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `tr_type` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the `transaction_category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `log_ID` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `fk_trtype_idx` ON `transaction`;

-- AlterTable
ALTER TABLE `transaction` DROP PRIMARY KEY,
    DROP COLUMN `Date`,
    DROP COLUMN `Details`,
    DROP COLUMN `sender`,
    DROP COLUMN `tr_ID`,
    DROP COLUMN `tr_type`,
    ADD COLUMN `log_ID` INTEGER NOT NULL,
    ADD PRIMARY KEY (`log_ID`);

-- AlterTable
ALTER TABLE `user` MODIFY `profile_pic` VARCHAR(255) NULL;

-- DropTable
DROP TABLE `transaction_category`;

-- CreateTable
CREATE TABLE `log` (
    `log_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `source_ID` INTEGER NOT NULL,
    `log_type` INTEGER NOT NULL,
    `Date` DATETIME(0) NOT NULL,
    `Details` VARCHAR(255) NULL,

    INDEX `fk_alog_uid`(`source_ID`),
    INDEX `fl_log_type`(`log_type`),
    PRIMARY KEY (`log_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_user_log` (
    `log_ID` INTEGER NOT NULL,
    `target_ID` INTEGER NOT NULL,

    INDEX `fk_alog_uid`(`target_ID`),
    PRIMARY KEY (`log_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log_category` (
    `trtype_PID` INTEGER NOT NULL AUTO_INCREMENT,
    `trtype_name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `trtype_name_UNIQUE`(`trtype_name`),
    PRIMARY KEY (`trtype_PID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `fk_pid` ON `transaction`(`product_ID`);
