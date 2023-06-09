/*
  Warnings:

  - You are about to drop the column `district` on the `anddresses` table. All the data in the column will be lost.
  - Added the required column `block` to the `anddresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "anddresses" DROP COLUMN "district",
ADD COLUMN     "block" VARCHAR(100) NOT NULL;
