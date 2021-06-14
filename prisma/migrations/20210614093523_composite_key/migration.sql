/*
  Warnings:

  - The primary key for the `LineItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `LineItem` table. All the data in the column will be lost.
  - Made the column `cartId` on table `LineItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "LineItem" DROP CONSTRAINT "LineItem_pkey",
DROP COLUMN "id",
ALTER COLUMN "cartId" SET NOT NULL,
ADD PRIMARY KEY ("productId", "cartId");
