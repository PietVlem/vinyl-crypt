/*
  Warnings:

  - Added the required column `name` to the `CollectionShare` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CollectionShare" ADD COLUMN     "name" TEXT NOT NULL;
