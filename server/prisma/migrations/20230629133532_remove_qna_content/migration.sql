/*
  Warnings:

  - The primary key for the `QnA` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `QnA` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `card` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `contact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `contact` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `QnA_content` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `answer` to the `QnA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `QnA` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `QnA_content` DROP FOREIGN KEY `QnA_content_QnA_Id_fkey`;

-- DropIndex
DROP INDEX `QnA_id_key` ON `QnA`;

-- DropIndex
DROP INDEX `card_id_key` ON `card`;

-- DropIndex
DROP INDEX `contact_id_key` ON `contact`;

-- AlterTable
ALTER TABLE `QnA` DROP PRIMARY KEY,
    ADD COLUMN `answer` TEXT NOT NULL,
    ADD COLUMN `question` TEXT NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `card` DROP PRIMARY KEY,
    ADD COLUMN `generic` ENUM('ABOUT', 'FEEDBACK', 'SERVICE') NOT NULL DEFAULT 'ABOUT',
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `contact` DROP PRIMARY KEY,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `QnA_content`;
