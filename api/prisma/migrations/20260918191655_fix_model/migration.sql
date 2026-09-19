/*
  Warnings:

  - The primary key for the `kv` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `kVId` on the `vid` table. All the data in the column will be lost.
  - Added the required column `KVId` to the `Vid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vid_num` to the `Vid` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `vid` DROP FOREIGN KEY `Vid_kVId_fkey`;

-- DropIndex
DROP INDEX `Vid_kVId_fkey` ON `vid`;

-- AlterTable
ALTER TABLE `kv` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `vid` DROP COLUMN `kVId`,
    ADD COLUMN `KVId` VARCHAR(191) NOT NULL,
    ADD COLUMN `vid_num` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Vid` ADD CONSTRAINT `Vid_KVId_fkey` FOREIGN KEY (`KVId`) REFERENCES `KV`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
