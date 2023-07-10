/*
  Warnings:

  - You are about to drop the column `image` on the `QnA_content` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `content` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `content_newsTitle_richTitle_treemanTitle_key` ON `content`;

-- AlterTable
ALTER TABLE `QnA_content` DROP COLUMN `image`;

-- CreateIndex
CREATE UNIQUE INDEX `content_title_key` ON `content`(`title`);
