/*
  Warnings:

  - The values [LARGE_ENVIRONEMT] on the enum `Environment` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Environment_new" AS ENUM ('HOUSE', 'APARTMENT', 'LARGE_ENVIRONMENT');
ALTER TABLE "pets" ALTER COLUMN "environment" TYPE "Environment_new" USING ("environment"::text::"Environment_new");
ALTER TYPE "Environment" RENAME TO "Environment_old";
ALTER TYPE "Environment_new" RENAME TO "Environment";
DROP TYPE "Environment_old";
COMMIT;
