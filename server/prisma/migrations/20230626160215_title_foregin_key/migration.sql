/*
  Warnings:

  - You are about to drop the column `newsId` on the `content` table. All the data in the column will be lost.
  - You are about to drop the column `richId` on the `content` table. All the data in the column will be lost.
  - You are about to drop the column `treemanId` on the `content` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `news` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `rich_block` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `treeman_block` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `content` DROP FOREIGN KEY `content_newsId_fkey`;

-- DropForeignKey
ALTER TABLE `content` DROP FOREIGN KEY `content_richId_fkey`;

-- DropForeignKey
ALTER TABLE `content` DROP FOREIGN KEY `content_treemanId_fkey`;

-- DropIndex
DROP INDEX `content_id_key` ON `content`;

-- DropIndex
DROP INDEX `news_id_key` ON `news`;

-- DropIndex
DROP INDEX `rich_block_id_key` ON `rich_block`;

-- DropIndex
DROP INDEX `treeman_block_id_key` ON `treeman_block`;

-- DropIndex
DROP INDEX `video_block_id_key` ON `video_block`;

-- DropIndex
DROP INDEX `video_block_content_id_key` ON `video_block_content`;

-- AlterTable
ALTER TABLE `content` DROP COLUMN `newsId`,
    DROP COLUMN `richId`,
    DROP COLUMN `treemanId`,
    ADD COLUMN `newsTitle` VARCHAR(191) NULL,
    ADD COLUMN `richTitle` VARCHAR(191) NULL,
    ADD COLUMN `treemanTitle` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `news_title_key` ON `news`(`title`);

-- CreateIndex
CREATE UNIQUE INDEX `rich_block_title_key` ON `rich_block`(`title`);

-- CreateIndex
CREATE UNIQUE INDEX `treeman_block_title_key` ON `treeman_block`(`title`);

-- AddForeignKey
ALTER TABLE `content` ADD CONSTRAINT `content_newsTitle_fkey` FOREIGN KEY (`newsTitle`) REFERENCES `news`(`title`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `content` ADD CONSTRAINT `content_richTitle_fkey` FOREIGN KEY (`richTitle`) REFERENCES `rich_block`(`title`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `content` ADD CONSTRAINT `content_treemanTitle_fkey` FOREIGN KEY (`treemanTitle`) REFERENCES `treeman_block`(`title`) ON DELETE CASCADE ON UPDATE CASCADE;
