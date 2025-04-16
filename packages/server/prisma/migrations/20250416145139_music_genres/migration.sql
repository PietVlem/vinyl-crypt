/*
  Warnings:

  - You are about to drop the column `genre` on the `VinylRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VinylRecord" DROP COLUMN "genre",
ADD COLUMN     "genreId" TEXT;

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- AddForeignKey
ALTER TABLE "VinylRecord" ADD CONSTRAINT "VinylRecord_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE SET NULL ON UPDATE CASCADE;
