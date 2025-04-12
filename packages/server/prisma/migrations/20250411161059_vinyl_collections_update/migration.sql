-- DropForeignKey
ALTER TABLE "VinylRecord" DROP CONSTRAINT "VinylRecord_artistId_fkey";

-- AlterTable
ALTER TABLE "VinylRecord" ALTER COLUMN "artistId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "VinylRecord" ADD CONSTRAINT "VinylRecord_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
