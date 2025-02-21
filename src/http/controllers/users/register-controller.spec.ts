import request from 'supertest'
import { app } from '@/app'
import { it, describe, beforeAll, afterAll, expect } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // antes dos teste executarem a aplicacao precisa ter terminado de inicializar
  })
  afterAll(async () => {
    await app.close() // dps que os testes encerrarem aguarda a aplicacao fechar
  })
  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Fulano',
      email: 'fulano@example.com',
      password: '123456',
    })
    expect(response.statusCode).toEqual(201)
  })
})
