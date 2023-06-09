-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(80) NOT NULL,
    "bearing" VARCHAR(80) NOT NULL,
    "dependencyLevel" VARCHAR(100) NOT NULL,
    "birthday" CHAR(20) NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);
