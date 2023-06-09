import { Address, Organization, Prisma, Telephone } from '@prisma/client'

export interface OrganizationData {
  id?: string
  name: string
  email: string
  cep: string
  password_hash: string
  block: string
  number?: string | null
  street: string
  complement?: string | null
}

export interface IOrganizationRepository {
  findByOrganizationCep(cepCity: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
  insertAddressAOrganization(
    data: Prisma.AddressUncheckedCreateInput,
  ): Promise<Address>
  insertPhoneAOrganization(
    data: Prisma.TelephoneUncheckedCreateInput,
  ): Promise<Telephone>
}
