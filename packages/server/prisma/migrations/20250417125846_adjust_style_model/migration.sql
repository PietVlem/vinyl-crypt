/*
  Warnings:

  - You are about to drop the column `genreId` on the `Style` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Style" DROP CONSTRAINT "Style_genreId_fkey";

-- AlterTable
ALTER TABLE "Style" DROP COLUMN "genreId";
