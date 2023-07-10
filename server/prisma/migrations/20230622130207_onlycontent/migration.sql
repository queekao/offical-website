/*
  Warnings:

  - You are about to drop the `news_content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rich_block_content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `treeman_block_content` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `news_content` DROP FOREIGN KEY `news_content_newsId_fkey`;

-- DropForeignKey
ALTER TABLE `rich_block_content` DROP FOREIGN KEY `rich_block_content_richId_fkey`;

-- DropForeignKey
ALTER TABLE `treeman_block_content` DROP FOREIGN KEY `treeman_block_content_treemanId_fkey`;

-- DropTable
DROP TABLE `news_content`;

-- DropTable
DROP TABLE `rich_block_content`;

-- DropTable
DROP TABLE `treeman_block_content`;

-- CreateTable
CREATE TABLE `content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` JSON NOT NULL,
    `title` CHAR(50) NOT NULL,
    `content` TEXT NOT NULL,
    `newsId` INTEGER NULL,
    `richId` INTEGER NULL,
    `treemanId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `content` ADD CONSTRAINT `content_newsId_fkey` FOREIGN KEY (`newsId`) REFERENCES `news`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `content` ADD CONSTRAINT `content_richId_fkey` FOREIGN KEY (`richId`) REFERENCES `rich_block`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `content` ADD CONSTRAINT `content_treemanId_fkey` FOREIGN KEY (`treemanId`) REFERENCES `treeman_block`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
