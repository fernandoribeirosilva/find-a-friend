import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { GetManyPetUseCase } from '../get-pet'

export function makeGetPetUseCase() {
  const petRepository = new PrismaPetRepository()
  const organizationRepository = new PrismaOrganizationRepository()
  const useCase = new GetManyPetUseCase(petRepository, organizationRepository)

  return useCase
}
