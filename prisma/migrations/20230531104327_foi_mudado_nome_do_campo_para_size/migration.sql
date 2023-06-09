/*
  Warnings:

  - You are about to drop the column `bearing` on the `pets` table. All the data in the column will be lost.
  - Added the required column `size` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "bearing",
ADD COLUMN     "size" VARCHAR(80) NOT NULL;
