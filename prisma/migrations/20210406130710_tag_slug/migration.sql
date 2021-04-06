/*
  Warnings:

  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Tag` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProductToTag" DROP CONSTRAINT "_ProductToTag_B_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
DROP COLUMN "id",
ADD COLUMN     "slug" TEXT NOT NULL,
ADD PRIMARY KEY ("slug");

-- AddForeignKey
ALTER TABLE "_ProductToTag" ADD FOREIGN KEY ("B") REFERENCES "Tag"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
