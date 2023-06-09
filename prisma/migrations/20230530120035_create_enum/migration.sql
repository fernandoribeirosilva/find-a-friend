/*
  Warnings:

  - Added the required column `energy` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `environment` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('HOUSE', 'APARTMENT', 'LARGE_ENVIRONEMT');

-- CreateEnum
CREATE TYPE "Energy" AS ENUM ('MEDIA', 'HIGH', 'LOW');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "energy" "Energy" NOT NULL,
ADD COLUMN     "environment" "Environment" NOT NULL;
