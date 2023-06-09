-- CreateTable
CREATE TABLE "pet_images" (
    "id" TEXT NOT NULL,
    "pet_Id" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "pet_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pet_images" ADD CONSTRAINT "pet_images_pet_Id_fkey" FOREIGN KEY ("pet_Id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
