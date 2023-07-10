/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `video_block` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `video_block_content` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `video_block_title_key` ON `video_block`(`title`);

-- CreateIndex
CREATE UNIQUE INDEX `video_block_content_title_key` ON `video_block_content`(`title`);
