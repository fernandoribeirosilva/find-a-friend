import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateOrganizationUseCase } from './authenticate-organization'
import { InvalidCredentialsError } from './error/invalid-credentials-organization-error'

let organizationRepository: InMemoryOrganizationRepository
let sut: AuthenticateOrganizationUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new AuthenticateOrganizationUseCase(organizationRepository)
  })

  it('Should be able to authenticate organization', async () => {
    await organizationRepository.create({
      name: 'Organization-01',
      email: 'organization@example.com',
      cep: '123456',
      password_hash: await hash('123456', 6),
    })

    const { organization } = await sut.execute({
      email: 'organization@example.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('Should not be able to authenticate wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'organization@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate wrong password', async () => {
    await organizationRepository.create({
      name: 'Organization-01',
      email: 'organization@example.com',
      cep: '123456',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'organization@example.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
