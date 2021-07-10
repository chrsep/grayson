/*
  Warnings:

  - Added the required column `base64` to the `ProductImage` table without a default value. This is not possible if the table is not empty.
  - Made the column `productId` on table `ProductImage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "base64" TEXT NOT NULL,
ALTER COLUMN "productId" SET NOT NULL;
