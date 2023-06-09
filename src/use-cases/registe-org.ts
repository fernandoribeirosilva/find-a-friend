import { IOrganizationRepository } from '@/repositories/IOrganization-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { AlreadyExistsEmailError } from './error/already-exists-error'
import { FormatPhoneNotValideError } from './error/format-phone-not-valide-error'

interface RegisterOrganizationUseCaseRequest {
  name: string
  email: string
  cep: string
  password: string
  complement: string
  block: string
  number: string
  street: string
  latitude: number
  longitude: number
  phone: string
}

interface RegisterOrganizationUseCaseResponse {
  organization: Organization
}

export class RegisterOrganizationUseCase {
  constructor(private organizationRepository: IOrganizationRepository) { }

  async execute({
    name,
    email,
    cep,
    complement,
    number,
    street,
    password,
    block,
    latitude,
    longitude,
    phone,
  }: RegisterOrganizationUseCaseRequest): Promise<RegisterOrganizationUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const existEmail = await this.organizationRepository.findByEmail(email)

    if (existEmail) {
      throw new AlreadyExistsEmailError()
    }

    const organization = await this.organizationRepository.create({
      name,
      email,
      password_hash,
      cep,
    })

    await this.organizationRepository.insertAddressAOrganization({
      block,
      street,
      number: number ?? null,
      complement: complement ?? null,
      latitude,
      longitude,
      organization_id: organization.id,
    })
    const regexPhone = /(?=[^0])(^[1-9]{2})[\-][1-9]{9}/g
    const isValideFormatPhone = regexPhone.test(phone)

    if (!isValideFormatPhone) {
      throw new FormatPhoneNotValideError()
    }

    const telephone = phone.split('-')

    await this.organizationRepository.insertPhoneAOrganization({
      DDD: telephone[0],
      phone: telephone[1],
      organization_id: organization.id,
    })

    return {
      organization,
    }
  }
}
