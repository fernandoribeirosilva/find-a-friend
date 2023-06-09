import { ImageIsRequireError } from '@/use-cases/error/image-is-require-error'
import { makeUploadPhotosPetUseCase } from '@/use-cases/factories/make-upload-photos-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function uploadPhotos(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const upload = await request.file()

  if (!upload) {
    throw new ImageIsRequireError()
  }

  try {
    const photo = await makeUploadPhotosPetUseCase().execute({
      file: upload,
      request,
    })

    return reply.code(201).send(photo)
  } catch (error) {
    if (error instanceof ImageIsRequireError) {
      console.log(error.message)
      return reply.code(400).send({ message: error.message })
    }
  }
}
