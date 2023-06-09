import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { RegisterOrganizationUseCase } from '../registe-org'

export function makeRegisteOrganizationUseCase() {
  const organizationRepository = new PrismaOrganizationRepository()
  const useCase = new RegisterOrganizationUseCase(organizationRepository)

  return useCase
}
