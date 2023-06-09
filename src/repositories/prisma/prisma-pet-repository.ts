import { prisma } from '@/lib/prisma'
import { NotFoundPetError } from '@/use-cases/error/not-found-pet-error'
import { FetchPetByFilterUseCaseRequest } from '@/use-cases/fetch-pet-by-filter'
import { Energy, Prisma } from '@prisma/client'
import { IPetRepository } from '../IPet-repository'

export class PrismaPetRepository implements IPetRepository {
  async findManyPet(organizationId: string) {
    const pets = await prisma.pet.findMany({
      where: {
        organization_id: organizationId,
      },
    })

    return pets
  }

  async findPetByFilters(data: FetchPetByFilterUseCaseRequest) {
    const pets = await prisma.pet.findMany({
      where: {
        birthday: data.filterAge,
        energy: data.filterEnergy as Energy,
        size: data.filterSize,
        dependencyLevel: data.filterDependencyLevel,
      },
    })

    if (!pets) {
      throw new NotFoundPetError()
    }

    return pets
  }

  async uploadPhotoPet(fileName: string, petId: string) {
    const img = await prisma.pet_Images.create({
      data: {
        img: fileName,
        pet_id: petId,
      },
    })

    return img
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
