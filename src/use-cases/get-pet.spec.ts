import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetManyPetUseCase } from './get-pet'

let petRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: GetManyPetUseCase

describe('Get Many Pets', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new GetManyPetUseCase(petRepository, organizationRepository)

    await organizationRepository.create({
      id: 'org-01',
      name: 'Organization-01',
      email: 'organization@example.com',
      cep: '123456',
      password_hash: await hash('123', 6),
    })
  })

  it('Get Many a pet', async () => {
    await petRepository.create({
      size: 'media',
      birthday: 'adulto',
      type_pet: 'DOG',
      dependencyLevel: 'baixo',
      description: 'fasda',
      energy: 'LOW',
      adoption: true,
      environment: 'APARTMENT',
      name: 'tô',
      organization_id: 'org-01',
    })

    const { pets } = await sut.execute('123456')

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'tô' })])
  })
})
