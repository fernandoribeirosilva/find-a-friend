import { IPetRepository } from '@/repositories/IPet-repository'
import { MultipartFile } from '@fastify/multipart'
import { FastifyRequest } from 'fastify'
import { randomUUID } from 'node:crypto'
import { createWriteStream } from 'node:fs'
import { extname, resolve } from 'node:path'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import { ImageIsRequireError } from './error/image-is-require-error'

interface UploadPhotosUseCaseRequest {
  file: MultipartFile
  request: FastifyRequest
}

const pump = promisify(pipeline)

export class UploadPhotosUseCase {
  constructor(private uploadPhotosRepository: IPetRepository) { }

  async execute({ file, request }: UploadPhotosUseCaseRequest) {
    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/ // só vai aceitar video e fotos
    const isValidFileFormat = mimeTypeRegex.test(file.mimetype)

    if (!isValidFileFormat) {
      throw new ImageIsRequireError()
    }

    const fileId = randomUUID()
    const extension = extname(file.filename)

    const fileName = fileId.concat(extension)

    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads', fileName),
    )

    await pump(file.file, writeStream)

    const fullUrl = request.protocol.concat('://').concat(request.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

    return {
      fileUrl,
      fileName,
    }
  }
}
