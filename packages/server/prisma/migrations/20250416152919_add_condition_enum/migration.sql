/*
  Warnings:

  - The `condition` column on the `VinylRecord` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('mint', 'near_mint', 'very_good', 'good', 'fair', 'poor');

-- AlterTable
ALTER TABLE "VinylRecord" DROP COLUMN "condition",
ADD COLUMN     "condition" "Condition";
