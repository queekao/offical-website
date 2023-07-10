/*
  Warnings:

  - You are about to drop the column `content` on the `about` table. All the data in the column will be lost.
  - Added the required column `image` to the `QnA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `QnA` ADD COLUMN `image` JSON NOT NULL;

-- AlterTable
ALTER TABLE `QnA_content` MODIFY `question` TEXT NOT NULL,
    MODIFY `answer` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `about` DROP COLUMN `content`;

-- AlterTable
ALTER TABLE `card` MODIFY `content` TEXT NOT NULL;
