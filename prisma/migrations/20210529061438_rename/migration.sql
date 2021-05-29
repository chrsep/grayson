/*
  Warnings:

  - You are about to drop the column `paymentDirection` on the `Store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "paymentDirection",
ADD COLUMN     "howToPay" TEXT NOT NULL DEFAULT E'';
