/*
  Warnings:

  - You are about to drop the column `style` on the `VinylRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VinylRecord" DROP COLUMN "style",
ADD COLUMN     "styleId" TEXT;

-- CreateTable
CREATE TABLE "Style" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Style_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Style_name_key" ON "Style"("name");

-- AddForeignKey
ALTER TABLE "VinylRecord" ADD CONSTRAINT "VinylRecord_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES "Style"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Style" ADD CONSTRAINT "Style_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
