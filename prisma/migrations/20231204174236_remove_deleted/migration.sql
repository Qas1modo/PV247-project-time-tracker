/*
  Warnings:

  - You are about to drop the column `published` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `name` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "published",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" VARCHAR(255) NOT NULL;
