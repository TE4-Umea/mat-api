/*
  Warnings:

  - The primary key for the `categoryOnDish` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `categoryOnDish` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `dish` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `dish` DROP FOREIGN KEY `dish_categoryId_fkey`;

-- AlterTable
ALTER TABLE `categoryOnDish` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`dishId`, `categoryId`);

-- AlterTable
ALTER TABLE `dish` DROP COLUMN `categoryId`;
