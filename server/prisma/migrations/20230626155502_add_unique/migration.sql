/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `QnA` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `QnA_content` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `about` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `card` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `content` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `feedback` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `service` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `treeman_block` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `video_block` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `video_block_content` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `QnA_id_key` ON `QnA`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `QnA_content_id_key` ON `QnA_content`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `about_id_key` ON `about`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `card_id_key` ON `card`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `contact_id_key` ON `contact`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `content_id_key` ON `content`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `feedback_id_key` ON `feedback`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `service_id_key` ON `service`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `treeman_block_id_key` ON `treeman_block`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `video_block_id_key` ON `video_block`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `video_block_content_id_key` ON `video_block_content`(`id`);
