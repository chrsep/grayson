/*
  Warnings:

  - Made the column `phone` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
truncate table users cascade;

ALTER TABLE "users" ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "phone" SET DEFAULT E'';
