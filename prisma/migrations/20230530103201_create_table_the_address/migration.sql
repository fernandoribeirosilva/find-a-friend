-- CreateTable
CREATE TABLE "anddresses" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "district" VARCHAR(100) NOT NULL,
    "number" VARCHAR(20),
    "complement" VARCHAR(20),
    "street" VARCHAR(80) NOT NULL,
    "latitude" VARCHAR(120) NOT NULL,
    "longitude" VARCHAR(120) NOT NULL,

    CONSTRAINT "anddresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "anddresses" ADD CONSTRAINT "anddresses_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
