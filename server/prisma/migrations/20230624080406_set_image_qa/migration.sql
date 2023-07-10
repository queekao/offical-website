/*
  Warnings:

  - You are about to drop the column `image` on the `QnA` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[image]` on the table `card` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `QnA` DROP COLUMN `image`;

-- AlterTable
ALTER TABLE `QnA_content` ADD COLUMN `image` JSON NULL;

-- CreateIndex
CREATE UNIQUE INDEX `card_image_key` ON `card`(`image`);
