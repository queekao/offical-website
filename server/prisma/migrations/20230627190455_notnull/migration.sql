/*
  Warnings:

  - Made the column `aboutId` on table `card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `feedbackId` on table `card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `serviceId` on table `card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `newsTitle` on table `content` required. This step will fail if there are existing NULL values in that column.
  - Made the column `richTitle` on table `content` required. This step will fail if there are existing NULL values in that column.
  - Made the column `treemanTitle` on table `content` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `card` DROP FOREIGN KEY `card_aboutId_fkey`;

-- DropForeignKey
ALTER TABLE `card` DROP FOREIGN KEY `card_feedbackId_fkey`;

-- DropForeignKey
ALTER TABLE `card` DROP FOREIGN KEY `card_serviceId_fkey`;

-- DropForeignKey
ALTER TABLE `content` DROP FOREIGN KEY `content_newsTitle_fkey`;

-- DropForeignKey
ALTER TABLE `content` DROP FOREIGN KEY `content_richTitle_fkey`;

-- DropForeignKey
ALTER TABLE `content` DROP FOREIGN KEY `content_treemanTitle_fkey`;

-- DropIndex
DROP INDEX `content_title_key` ON `content`;

-- AlterTable
ALTER TABLE `card` MODIFY `aboutId` VARCHAR(191) NOT NULL,
    MODIFY `feedbackId` VARCHAR(191) NOT NULL,
    MODIFY `serviceId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `content` MODIFY `newsTitle` VARCHAR(191) NOT NULL,
    MODIFY `richTitle` VARCHAR(191) NOT NULL,
    MODIFY `treemanTitle` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `content` ADD CONSTRAINT `content_newsTitle_fkey` FOREIGN KEY (`newsTitle`) REFERENCES `news`(`title`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `content` ADD CONSTRAINT `content_richTitle_fkey` FOREIGN KEY (`richTitle`) REFERENCES `rich_block`(`title`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `content` ADD CONSTRAINT `content_treemanTitle_fkey` FOREIGN KEY (`treemanTitle`) REFERENCES `treeman_block`(`title`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `card` ADD CONSTRAINT `card_aboutId_fkey` FOREIGN KEY (`aboutId`) REFERENCES `about`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `card` ADD CONSTRAINT `card_feedbackId_fkey` FOREIGN KEY (`feedbackId`) REFERENCES `feedback`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `card` ADD CONSTRAINT `card_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
