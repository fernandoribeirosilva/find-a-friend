import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  const organization = await prisma.organization.create({
    data: {
      name: 'Organization 01',
      email: 'organization@example.com',
      password_hash: await hash('123456', 6),
      cep: '123',
    },
  })

  await request(app.server).post('/register/organization').send({
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

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'organization@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
    organization,
  }
}
