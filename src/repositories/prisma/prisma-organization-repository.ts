import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { IOrganizationRepository } from '../IOrganization-repository'

export class PrismaOrganizationRepository implements IOrganizationRepository {
  async findByOrganizationCep(cepCity: string) {
    return await prisma.organization.findFirst({
      where: {
        cep: cepCity,
      },
    })
  }

  async findByEmail(email: string) {
    return await prisma.organization.findFirst({
      where: {
        email,
      },
    })
  }

  async create(data: Prisma.OrganizationCreateInput) {
    return await prisma.organization.create({ data })
  }

  async insertAddressAOrganization(data: Prisma.AddressUncheckedCreateInput) {
    return await prisma.address.create({ data })
  }

  async insertPhoneAOrganization(data: Prisma.TelephoneUncheckedCreateInput) {
    return await prisma.telephone.create({ data })
  }
}
