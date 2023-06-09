import { AlreadyExistsEmailError } from '@/use-cases/error/already-exists-error'
import { FormatPhoneNotValideError } from '@/use-cases/error/format-phone-not-valide-error'
import { makeRegisteOrganizationUseCase } from '@/use-cases/factories/make-register-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const organizationBodySchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    cep: z.string(),
    complement: z.string(),
    number: z.string(),
    street: z.string(),
    password: z.string().min(6),
    block: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    phone: z.string(),
  })

  const dataOrganization = organizationBodySchema.parse(request.body)

  try {
    const organization = makeRegisteOrganizationUseCase()
    await organization.execute(dataOrganization)

    return reply.code(201).send()
  } catch (error) {
    if (
      error instanceof AlreadyExistsEmailError ||
      error instanceof FormatPhoneNotValideError
    ) {
      console.log(error.message)
      return reply.code(400).send({ message: error.message })
    }
  }
}
