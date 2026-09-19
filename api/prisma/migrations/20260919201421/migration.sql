/*
  Warnings:

  - You are about to alter the column `vid_num` on the `vid` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `vid` MODIFY `vid_num` DOUBLE NOT NULL;
