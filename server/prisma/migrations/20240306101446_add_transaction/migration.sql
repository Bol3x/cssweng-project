-- CreateTable
CREATE TABLE `transaction` (
    `tr_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tr_type` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `sender` INTEGER NOT NULL,
    `Date` DATETIME(0) NOT NULL,
    `Amount` INTEGER NOT NULL,
    `Details` VARCHAR(191) NULL,

    INDEX `fk_trtype_idx`(`tr_type`),
    PRIMARY KEY (`tr_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_category` (
    `trtype_PID` INTEGER NOT NULL AUTO_INCREMENT,
    `trtype_name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `trtype_name_UNIQUE`(`trtype_name`),
    PRIMARY KEY (`trtype_PID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
