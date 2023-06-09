import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetByFilterUseCase } from './fetch-pet-by-filter'

let petRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: FetchPetByFilterUseCase

describe('Fetch Pets By Filter', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new FetchPetByFilterUseCase(petRepository, organizationRepository)

    await organizationRepository.create({
      id: 'org-01',
      name: 'Organization-01',
      email: 'organization@example.com',
      cep: '123456',
      block: 'rua 123',
      password_hash: await hash('123', 6),
      street: 'rua 01',
      telephone: '63999999999',
    })
  })

  it('Fetch a pet by filter', async () => {
    await petRepository.create({
      size: 'media',
      type_pet: 'DOG',
      birthday: 'adulto',
      dependencyLevel: 'baixo',
      description: 'fasda',
      energy: 'MEDIA',
      adoption: true,
      environment: 'APARTMENT',
      name: 'tô',
      organization_id: 'org-01',
    })

    await petRepository.create({
      size: 'pequeno',
      type_pet: 'CAT',
      birthday: 'filhote',
      dependencyLevel: 'baixo',
      description: 'fasda',
      energy: 'LOW',
      adoption: true,
      environment: 'APARTMENT',
      name: 'Fred',
      organization_id: 'org-01',
    })

    await petRepository.create({
      size: 'pequeno',
      type_pet: 'CAT',
      birthday: 'filhote',
      dependencyLevel: 'baixo',
      description: 'fasda',
      energy: 'LOW',
      adoption: true,
      environment: 'APARTMENT',
      name: 'jade',
      organization_id: 'org-01',
    })

    const { pets } = await sut.execute(
      {
        filterAge: 'filhote',
        filterDependencyLevel: 'baixo',
        filterEnergy: 'low'.toUpperCase(),
        filterSize: 'pequeno',
      },
      '123456',
    )

    expect(pets).toHaveLength(2)
    expect(pets[0].id).toEqual(expect.any(String))
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Fred' }),
      expect.objectContaining({ name: 'jade' }),
    ])
  })
})
