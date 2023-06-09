import { IOrganizationRepository } from '@/repositories/IOrganization-repository'
import { Organization } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './error/invalid-credentials-organization-error'

interface AuthenticateOrganizationRequest {
  email: string
  password: string
}

interface AuthenticateOrganizationResponse {
  organization: Organization
}

export class AuthenticateOrganizationUseCase {
  constructor(private organizationRepository: IOrganizationRepository) { }

  async execute({
    email,
    password,
  }: AuthenticateOrganizationRequest): Promise<AuthenticateOrganizationResponse> {
    const organization = await this.organizationRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(
      password,
      organization.password_hash,
    )

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      organization,
    }
  }
}
