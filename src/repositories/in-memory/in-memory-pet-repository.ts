import { FetchPetByFilterUseCaseRequest } from '@/use-cases/fetch-pet-by-filter'
import { Pet, Pet_Images, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { IPetRepository } from '../IPet-repository'

export class InMemoryPetRepository implements IPetRepository {
  public items: Pet[] = []
  public imgPet: Pet_Images[] = []

  async findManyPet(organizationId: string) {
    const pets = this.items.filter((item) => {
      return item.adoption && item.organization_id === organizationId
    })

    return pets
  }

  async findPetByFilters(data: FetchPetByFilterUseCaseRequest) {
    const pets = this.items.filter((item) => {
      const pet: Pet[] = []

      if (
        item.birthday.includes(data.filterAge) &&
        item.energy.includes(data.filterEnergy) &&
        item.dependencyLevel.includes(data.filterDependencyLevel) &&
        item.size.includes(data.filterSize)
      ) {
        return pet.push({ ...item })
      }

      return null
    })

    return pets
  }

  async uploadPhotoPet(img: string, petId: string) {
    const dataImg = {
      id: randomUUID(),
      pet_id: petId,
      img,
    }

    this.imgPet.push(dataImg)

    return dataImg
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      organization_id: data.organization_id,
      name: data.name,
      adoption: data.adoption ?? true,
      energy: data.energy,
      environment: data.environment,
      description: data.description,
      size: data.size,
      type_pet: data.type_pet,
      dependencyLevel: data.dependencyLevel,
      birthday: data.birthday,
    }

    this.items.push(pet)

    return pet
  }
}
