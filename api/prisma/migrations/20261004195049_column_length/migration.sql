/*
  Warnings:

  - You are about to alter the column `token` on the `RefreshToken` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(64)`.

*/
-- AlterTable
ALTER TABLE `RefreshToken` MODIFY `token` VARCHAR(64) NOT NULL;
