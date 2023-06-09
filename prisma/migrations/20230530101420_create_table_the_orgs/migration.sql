-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "cep" VARCHAR(20) NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);
