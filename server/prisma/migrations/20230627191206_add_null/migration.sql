-- DropForeignKey
ALTER TABLE `card` DROP FOREIGN KEY `card_aboutId_fkey`;

-- DropForeignKey
ALTER TABLE `card` DROP FOREIGN KEY `card_feedbackId_fkey`;

-- DropForeignKey
ALTER TABLE `card` DROP FOREIGN KEY `card_serviceId_fkey`;

-- AlterTable
ALTER TABLE `card` MODIFY `aboutId` VARCHAR(191) NULL,
    MODIFY `feedbackId` VARCHAR(191) NULL,
    MODIFY `serviceId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `content` MODIFY `newsTitle` VARCHAR(191) NULL,
    MODIFY `richTitle` VARCHAR(191) NULL,
    MODIFY `treemanTitle` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `card` ADD CONSTRAINT `card_aboutId_fkey` FOREIGN KEY (`aboutId`) REFERENCES `about`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `card` ADD CONSTRAINT `card_feedbackId_fkey` FOREIGN KEY (`feedbackId`) REFERENCES `feedback`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `card` ADD CONSTRAINT `card_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
