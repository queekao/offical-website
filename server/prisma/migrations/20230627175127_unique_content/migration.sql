/*
  Warnings:

  - A unique constraint covering the columns `[newsTitle]` on the table `content` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[richTitle]` on the table `content` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[treemanTitle]` on the table `content` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `content_newsTitle_key` ON `content`(`newsTitle`);

-- CreateIndex
CREATE UNIQUE INDEX `content_richTitle_key` ON `content`(`richTitle`);

-- CreateIndex
CREATE UNIQUE INDEX `content_treemanTitle_key` ON `content`(`treemanTitle`);
