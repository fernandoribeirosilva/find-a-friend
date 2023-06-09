import { Address, Organization, Prisma, Telephone } from '@prisma/client'
import { randomUUID } from 'crypto'
import { IOrganizationRepository } from '../IOrganization-repository'

export class InMemoryOrganizationRepository implements IOrganizationRepository {
  public items: Organization[] = []
  public phoneOrganization: Telephone[] = []
  public addressOrganization: Address[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) return null

    return user
  }

  async insertAddressAOrganization(data: Prisma.AddressUncheckedCreateInput) {
    const address = {
      id: data.id ?? randomUUID(),
      organization_id: data.organization_id,
      block: data.block,
      number: data.number ?? null,
      complement: data.complement ?? null,
      street: data.street,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.addressOrganization.push(address)

    return address
  }

  async insertPhoneAOrganization(data: Prisma.TelephoneUncheckedCreateInput) {
    const phone = {
      id: data.id ?? randomUUID(),
      DDD: data.DDD,
      phone: data.phone,
      organization_id: data.organization_id,
    }

    this.phoneOrganization.push(phone)

    return phone
  }

  async findByOrganizationCep(cepCity: string) {
    const city = this.items.find((item) => item.cep === cepCity)

    if (!city) return null

    return city
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      cep: data.cep,
      password_hash: data.password_hash,
    }

    this.items.push(organization)

    return organization
  }
}
