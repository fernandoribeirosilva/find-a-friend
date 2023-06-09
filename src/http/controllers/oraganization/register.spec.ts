import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // vai esperar a aplicação subir
  })

  afterAll(async () => {
    await app.close() // vai aguardar a aplicação fechar
  })

  it('should be able to register organization', async () => {
    const response = await request(app.server)
      .post('/register/organization')
      .send({
        name: 'Organization-01',
        email: 'organization@example.com',
        cep: '123456',
        complement: 'rua do meio',
        number: '123',
        street: 'rua 01',
        password: '123456',
        block: 'rua 123',
        latitude: -13.2248733,
        longitude: -49.5076427,
        phone: '63-998415568',
      })

    expect(response.statusCode).toEqual(201)
  })
})
