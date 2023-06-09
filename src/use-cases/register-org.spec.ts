import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AlreadyExistsEmailError } from './error/already-exists-error'
import { FormatPhoneNotValideError } from './error/format-phone-not-valide-error'
import { RegisterOrganizationUseCase } from './registe-org'

let organizationRepository: InMemoryOrganizationRepository
let sut: RegisterOrganizationUseCase

describe('Register Organization', () => {
  beforeEach(async () => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new RegisterOrganizationUseCase(organizationRepository)
  })

  it('Should be able to register organization', async () => {
    const { organization } = await sut.execute({
      name: 'Organization-01',
      email: 'organization@example.com',
      cep: '123456',
      complement: 'rua do meio',
      number: '123',
      street: 'rua 01',
      password: '123456',
      block: 'rua 123',
      latitude: -13.2248733,
      longitude: -49.5076427,
      phone: '63-998415568',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('Should not be able to register with same email twice', async () => {
    const email = 'organization@example.com'

    await sut.execute({
      name: 'Organization-01',
      email,
      cep: '123456',
      complement: 'rua do meio',
      number: '123',
      street: 'rua 01',
      password: '123456',
      block: 'rua 123',
      latitude: -13.2248733,
      longitude: -49.5076427,
      phone: '63-998415568',
    })

    await expect(() =>
      sut.execute({
        name: 'Organization-01',
        email,
        cep: '123456',
        complement: 'rua do meio',
        number: '123',
        street: 'rua 01',
        password: '123456',
        block: 'rua 123',
        latitude: -13.2248733,
        longitude: -49.5076427,
        phone: '63-998415568',
      }),
    ).rejects.toBeInstanceOf(AlreadyExistsEmailError)
  })

  it('Should be able to valide phone a organization', async () => {
    await expect(() =>
      sut.execute({
        name: 'Organization-01',
        email: 'organization@example.com',
        cep: '123456',
        complement: 'rua do meio',
        number: '123',
        street: 'rua 01',
        password: '123456',
        block: 'rua 123',
        latitude: -13.2248733,
        longitude: -49.5076427,
        phone: '63998415568',
      }),
    ).rejects.toBeInstanceOf(FormatPhoneNotValideError)
  })
})
