import { makeRegistePetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const petBodySchema = z.object({
    name: z.string(),
    birthday: z.string(),
    description: z.string(),
    energy: z.literal('MEDIA').or(z.literal('HIGH')).or(z.literal('LOW')),
    environment: z
      .literal('HOUSE')
      .or(z.literal('APARTMENT'))
      .or(z.literal('LARGE_ENVIRONMENT')),
    dependencyLevel: z.string(),
    size: z.string(),
    type_pet: z.literal('CAT').or(z.literal('DOG')),
    orgId: z.string(),
    imgPet: z.string(),
  })

  const dataOrganization = petBodySchema.parse(request.body)

  try {
    const pet = makeRegistePetUseCase()
    await pet.execute(dataOrganization)

    return reply.code(201).send()
  } catch (error) { }
}
