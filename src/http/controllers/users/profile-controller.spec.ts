import request from 'supertest'
import { app } from '@/app'
import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // antes dos teste executarem a aplicacao precisa ter terminado de inicializar
  })
  afterAll(async () => {
    await app.close() // dps que os testes encerrarem aguarda a aplicacao fechar
  })
  it('should be able to get user profile', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'fulano@example.com',
      }),
    )
  })
})
