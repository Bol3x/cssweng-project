-- CreateTable
CREATE TABLE `product` (
    `product_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `brand` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `type` INTEGER NOT NULL,
    `stock` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `last_updated` DATETIME(0) NOT NULL,
    `sell_price` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `sales` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `revenue` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `avg_value` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `order_amt` INTEGER UNSIGNED NOT NULL DEFAULT 0,

    UNIQUE INDEX `product_id_UNIQUE`(`product_ID`),
    INDEX `fk_ptype_idx`(`type`),
    UNIQUE INDEX `name_brand_UNIQUE`(`name`, `brand`),
    PRIMARY KEY (`product_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_category` (
    `category_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `category_id_UNIQUE`(`category_ID`),
    UNIQUE INDEX `name_UNIQUE`(`name`),
    PRIMARY KEY (`category_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `type` INTEGER NOT NULL,
    `pass` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `phone_num` VARCHAR(12) NOT NULL,
    `profile_pic` VARCHAR(191) NULL,
    `date_created` DATETIME(0) NOT NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    INDEX `fk_utype_idx`(`type`),
    PRIMARY KEY (`user_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_category` (
    `utype_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `utype_title` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `utype_title_UNIQUE`(`utype_title`),
    PRIMARY KEY (`utype_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
