/*
  Warnings:

  - Added the required column `type_pet` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypePet" AS ENUM ('CAT', 'DOG');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "type_pet" "TypePet" NOT NULL;
