/*
  Warnings:

  - A unique constraint covering the columns `[newsTitle,richTitle,treemanTitle]` on the table `content` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `content_newsTitle_richTitle_treemanTitle_key` ON `content`(`newsTitle`, `richTitle`, `treemanTitle`);
