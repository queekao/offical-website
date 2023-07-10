/*
  Warnings:

  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image` to the `news_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `rich_block_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `treeman_block_content` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_news_contentId_fkey`;

-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_rich_block_contentId_fkey`;

-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_treeman_block_contentId_fkey`;

-- AlterTable
ALTER TABLE `news_content` ADD COLUMN `image` JSON NOT NULL;

-- AlterTable
ALTER TABLE `rich_block_content` ADD COLUMN `image` JSON NOT NULL;

-- AlterTable
ALTER TABLE `treeman_block_content` ADD COLUMN `image` JSON NOT NULL;

-- DropTable
DROP TABLE `images`;
