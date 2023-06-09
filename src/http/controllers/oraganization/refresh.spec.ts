import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // vai esperar a aplicação subir
  })

  afterAll(async () => {
    await app.close() // vai aguardar a aplicação fechar
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/register/organization').send({
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'organization@example.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
