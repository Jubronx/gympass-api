import { FastifyInstance } from 'fastify'
import { registerController } from './register-controller'
import { authenticateController } from './authenticate-controller'
import { profileController } from './profile-controller'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { refreshToken } from './refresh-token'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  // Quando quiser utilizar o body na requisicao usar o post
  app.post('/sessions', authenticateController)
  app.patch('/token/refresh', refreshToken)
  //* Essas rotas so poderao ser chamadas se o usuario estiver autenticado  *//
  app.get('/me', { onRequest: [verifyJWT] }, profileController)
}
