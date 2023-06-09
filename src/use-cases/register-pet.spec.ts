import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPetUseCase } from './register-pet'

let petRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: RegisterPetUseCase

describe('Register Pet', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new RegisterPetUseCase(petRepository)

    await organizationRepository.create({
      id: 'org-01',
      name: 'Organization-01',
      email: 'organization@example.com',
      cep: '123456',
      password_hash: await hash('123', 6),
    })
  })

  it('Should be able to register', async () => {
    const { pet } = await sut.execute({
      size: 'media',
      type_pet: 'DOG',
      birthday: 'filhote',
      dependencyLevel: 'baixo',
      description: 'fasda',
      energy: 'LOW',
      environment: 'APARTMENT',
      name: 'jade',
      orgId: 'org-01',
      imgPet: 'imgPet.png',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
