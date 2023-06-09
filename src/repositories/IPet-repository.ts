import { FetchPetByFilterUseCaseRequest } from '@/use-cases/fetch-pet-by-filter'
import { Pet, Pet_Images, Prisma } from '@prisma/client'

export interface IPetRepository {
  findManyPet(organizationId: string): Promise<Pet[]>
  findPetByFilters(data: FetchPetByFilterUseCaseRequest): Promise<Pet[] | null>
  uploadPhotoPet(img: string, petId: string): Promise<Pet_Images>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
