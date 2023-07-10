/*
  Warnings:

  - A unique constraint covering the columns `[confirmationCode]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `confirmationCode` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `confirmationCode` CHAR(255) NOT NULL,
    ADD COLUMN `status` ENUM('PENDING', 'ACTIVE') NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX `user_confirmationCode_key` ON `user`(`confirmationCode`);
