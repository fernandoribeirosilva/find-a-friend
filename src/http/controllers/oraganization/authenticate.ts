import { InvalidCredentialsError } from '@/use-cases/error/invalid-credentials-organization-error'
import { makeAuthenticateOrganizationUseCase } from '@/use-cases/factories/make-authenticate-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticate = makeAuthenticateOrganizationUseCase()
    const { organization } = await authenticate.execute({ email, password })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
          expiresIn: '7d', // 7 days
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .code(200)
      .send({
        token,
      })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.code(400).send({ message: error.message })
    }
    throw error
  }
}
