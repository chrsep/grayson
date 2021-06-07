-- CreateEnum
CREATE TYPE "Category" AS ENUM ('MAKANAN', 'SENI', 'PAKAIAN', 'JASA', 'EDUKASI', 'LAINNYA');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" "Category" NOT NULL DEFAULT E'LAINNYA';
