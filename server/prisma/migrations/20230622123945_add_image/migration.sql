/*
  Warnings:

  - You are about to alter the column `video_url` on the `video_block_content` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - Added the required column `image` to the `news` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `rich_block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `treeman_block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster` to the `video_block` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `news` ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `rich_block` ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `treeman_block` ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `video_block` ADD COLUMN `poster` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `video_block_content` MODIFY `video_url` JSON NOT NULL;
