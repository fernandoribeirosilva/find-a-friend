import { IPetRepository } from '@/repositories/IPet-repository'
import { Energy, Environment, Pet, TypePet } from '@prisma/client'

interface RegisterPetUseCaseRequest {
  name: string
  birthday: string
  description: string
  energy: Energy
  environment: Environment
  dependencyLevel: string
  size: string
  type_pet: TypePet
  orgId: string
  imgPet: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petRepository: IPetRepository) { }

  async execute({
    name,
    birthday,
    description,
    energy,
    environment,
    dependencyLevel,
    type_pet,
    size,
    orgId,
    imgPet,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petRepository.create({
      name,
      size,
      type_pet,
      birthday,
      dependencyLevel,
      description,
      energy,
      environment,
      organization_id: orgId,
    })

    await this.petRepository.uploadPhotoPet(imgPet, pet.id)

    return {
      pet,
    }
  }
}
