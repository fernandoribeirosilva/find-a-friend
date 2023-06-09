/*
  Warnings:

  - You are about to drop the column `pet_Id` on the `pet_images` table. All the data in the column will be lost.
  - You are about to drop the `orgs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pet_id` to the `pet_images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pet_images" DROP CONSTRAINT "pet_images_pet_Id_fkey";

-- AlterTable
ALTER TABLE "pet_images" DROP COLUMN "pet_Id",
ADD COLUMN     "pet_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "orgs";

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "cep" VARCHAR(20) NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "telephones" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "DDD" CHAR(2) NOT NULL,
    "phone" CHAR(9) NOT NULL,

    CONSTRAINT "telephones_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pet_images" ADD CONSTRAINT "pet_images_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "telephones" ADD CONSTRAINT "telephones_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
