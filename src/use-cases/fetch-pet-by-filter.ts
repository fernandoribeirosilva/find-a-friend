import { IOrganizationRepository } from '@/repositories/IOrganization-repository'
import { IPetRepository } from '@/repositories/IPet-repository'
import { Pet } from '@prisma/client'
import { NotFoundCityError } from './error/could-not-find-city-error'
import { NotFoundPetError } from './error/not-found-pet-error'

export interface FetchPetByFilterUseCaseRequest {
  filterAge?: string
  filterEnergy?: string
  filterSize?: string
  filterDependencyLevel?: string
}

interface FetchPetByFilterUseCaseResponse {
  pets: Pet[]
}

export class FetchPetByFilterUseCase {
  constructor(
    private petRepository: IPetRepository,
    private organizationRepository: IOrganizationRepository,
  ) { }

  async execute(
    {
      filterAge,
      filterSize,
      filterEnergy,
      filterDependencyLevel,
    }: FetchPetByFilterUseCaseRequest,
    cepCity: string,
  ): Promise<FetchPetByFilterUseCaseResponse> {
    const organization =
      await this.organizationRepository.findByOrganizationCep(cepCity)

    if (!organization) {
      throw new NotFoundCityError()
    }

    const pets = await this.petRepository.findPetByFilters({
      filterAge,
      filterEnergy,
      filterSize,
      filterDependencyLevel,
    })

    if (!pets) {
      throw new NotFoundPetError()
    }

    return {
      pets,
    }
  }
}
