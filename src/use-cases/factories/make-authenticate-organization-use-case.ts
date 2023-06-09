import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { AuthenticateOrganizationUseCase } from '../authenticate-organization'

export function makeAuthenticateOrganizationUseCase() {
  const organizationRepository = new PrismaOrganizationRepository()
  const useCase = new AuthenticateOrganizationUseCase(organizationRepository)

  return useCase
}
