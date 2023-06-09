import { NotFoundCityError } from '@/use-cases/error/could-not-find-city-error'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const cepCityBodySchema = z.object({
    cepCity: z.string(),
  })

  const { cepCity } = cepCityBodySchema.parse(request.body)

  try {
    const pet = makeGetPetUseCase()
    const pets = await pet.execute(cepCity)

    return reply.code(200).send({ pets })
  } catch (error) {
    if (error instanceof NotFoundCityError) {
      console.log(error.message)
      return reply.code(400).send({ message: error.message })
    }
  }
}
