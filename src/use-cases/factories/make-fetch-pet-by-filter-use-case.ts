import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { FetchPetByFilterUseCase } from '../fetch-pet-by-filter'

export function makeFetchPetByFilterUseCase() {
  const petRepository = new PrismaPetRepository()
  const organizationRepository = new PrismaOrganizationRepository()
  const useCase = new FetchPetByFilterUseCase(
    petRepository,
    organizationRepository,
  )

  return useCase
}
