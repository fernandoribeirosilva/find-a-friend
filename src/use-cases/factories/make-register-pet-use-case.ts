import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { RegisterPetUseCase } from '../register-pet'

export function makeRegistePetUseCase() {
  const organizationRepository = new PrismaPetRepository()
  const useCase = new RegisterPetUseCase(organizationRepository)

  return useCase
}
