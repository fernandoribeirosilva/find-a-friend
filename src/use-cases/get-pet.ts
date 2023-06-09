import { IOrganizationRepository } from '@/repositories/IOrganization-repository'
import { IPetRepository } from '@/repositories/IPet-repository'
import { Pet } from '@prisma/client'
import { NotFoundCityError } from './error/could-not-find-city-error'

interface GetManyPetUseCaseResponse {
  pets: Pet[]
}

export class GetManyPetUseCase {
  constructor(
    private petRepository: IPetRepository,
    private organizationRepository: IOrganizationRepository,
  ) {}

  async execute(cepCity: string): Promise<GetManyPetUseCaseResponse> {
    const organization =
      await this.organizationRepository.findByOrganizationCep(cepCity)

    if (!organization) {
      throw new NotFoundCityError()
    }

    const pets = await this.petRepository.findManyPet(organization.id)

    return {
      pets,
    }
  }
}
