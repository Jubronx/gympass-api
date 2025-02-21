import request from 'supertest'
import { app } from '@/app'
import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // antes dos teste executarem a aplicacao precisa ter terminado de inicializar
  })
  afterAll(async () => {
    await app.close() // dps que os testes encerrarem aguarda a aplicacao fechar
  })
  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)
    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Stay batata frits gym',
        description: 'Some description',
        phone: '12312312312',
        latitude: -23.5265311,
        longitude: -46.5215895,
      })

    expect(response.statusCode).toEqual(201)
  })
})
