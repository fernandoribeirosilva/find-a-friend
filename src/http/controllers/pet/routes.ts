import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { fetchFilter } from './fetch-pet-by-filter'
import { getPet } from './get-pet-by-cep'
import { register } from './register'
import { uploadPhotos } from './upload-photo-pet'

export async function uploadPhotoPetRoutes(app: FastifyInstance) {
  app.get('/fetch-filter', fetchFilter)
  app.get('/get-pet-by-cep', getPet)

  app.post('/register/pet', { onRequest: [verifyJWT] }, register)

  app.post('/upload/photos', { onRequest: [verifyJWT] }, uploadPhotos)
}
