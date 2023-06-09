import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { UploadPhotosUseCase } from '../upload-photo-pet'

export function makeUploadPhotosPetUseCase() {
  const uploadPhotosRepository = new PrismaPetRepository()
  const useCase = new UploadPhotosUseCase(uploadPhotosRepository)

  return useCase
}
