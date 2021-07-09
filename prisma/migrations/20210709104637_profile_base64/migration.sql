/*
  Warnings:

  - The primary key for the `ProductImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `objectName` on the `ProductImage` table. All the data in the column will be lost.
  - Added the required column `key` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_pkey",
DROP COLUMN "objectName",
ADD COLUMN     "key" TEXT NOT NULL,
ADD PRIMARY KEY ("key");

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "imageBase64" TEXT;
