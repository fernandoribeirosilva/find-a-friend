import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import fastify from 'fastify'
import { resolve } from 'node:path'
import { env } from 'process'
import { ZodError } from 'zod'
import { organizationRoutes } from './http/controllers/oraganization/routes'
import { uploadPhotoPetRoutes } from './http/controllers/pet/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET as string,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m', // 10 minutos estes 10 minutos é para o token não é para o refreshToken // em aplicação que vamos deixar o usuário logado para sempre é bom deixar uma data expiração bem curta, assim podemos revalidar este token constantemente em pouco em pouco tempo, revalidar este token. Que é este processo de  checar se existe um refrashToken dentro do contesto da nossa requisição, se sim criar um novo JWT, a sim o usuário nunca vai perder o login
  },
})

app.register(fastifyCookie)

app.register(multipart, {
  limits: {
    fileSize: 5_242_880, // 5Mb
  },
})

app.register(cors, {
  origin: true,
})

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(uploadPhotoPetRoutes)
app.register(organizationRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO Here wa should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
