import { NotFoundCityError } from '@/use-cases/error/could-not-find-city-error'
import { NotFoundPetError } from '@/use-cases/error/not-found-pet-error'
import { makeFetchPetByFilterUseCase } from '@/use-cases/factories/make-fetch-pet-by-filter-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchFilter(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const filterPetBodySchema = z.object({
    filterAge: z.string().optional(),
    filterEnergy: z.string().optional(),
    filterSize: z.string().optional(),
    filterDependencyLevel: z.string().optional(),
  })

  const cepCityBodySchema = z.object({
    cepCity: z.string(),
  })

  const dataOrganization = filterPetBodySchema.parse(request.body)
  const { cepCity } = cepCityBodySchema.parse(request.body)

  try {
    const pet = makeFetchPetByFilterUseCase()
    const pets = await pet.execute(dataOrganization, cepCity)

    return reply.code(200).send({ pets })
  } catch (error) {
    if (
      error instanceof NotFoundCityError ||
      error instanceof NotFoundPetError
    ) {
      console.log(error.message)
      return reply.code(400).send({ message: error.message })
    }
  }
}
