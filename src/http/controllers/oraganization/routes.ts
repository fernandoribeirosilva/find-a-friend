import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { register } from './register'

export async function organizationRoutes(app: FastifyInstance) {
  app.patch('/token/refresh', refresh)

  app.post('/sessions', authenticate)

  app.post('/register/organization', register)
}
