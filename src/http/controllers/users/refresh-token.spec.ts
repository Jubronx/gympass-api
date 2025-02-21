import request from 'supertest'
import { app } from '@/app'
import { it, describe, beforeAll, afterAll, expect } from 'vitest'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // antes dos teste executarem a aplicacao precisa ter terminado de inicializar
  })
  afterAll(async () => {
    await app.close() // dps que os testes encerrarem aguarda a aplicacao fechar
  })
  it('should be able to refresh a token', async () => {
    await request(app.server).post('/users').send({
      name: 'Fulano',
      email: 'fulano@example.com',
      password: '123456',
    })
    const authResponse = await request(app.server).post('/sessions').send({
      email: 'fulano@example.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')?? []

    const response = await request(app.server).patch('/token/refresh').set('Cookie', cookies).send()
   
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
        expect.stringContaining('refreshToken=')
    ])
  })
})
