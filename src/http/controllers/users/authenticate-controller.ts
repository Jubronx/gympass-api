import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })
    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )
    const refreshToken = await reply.jwtSign(
      {role: user.role,},
      {
        sign: {
          sub: user.id,
          expiresIn: '7d', // se o usuario ficar 7 dias sem entrar na aplicacao
        },
      },
    )
    return reply.setCookie('refreshToken', refreshToken, {
      path: '/', //quais paths do meu backend terao acesso ao meu cookie, nesse caso todas as rotas terao acesso
      secure: true, // incriptado pelo https
      sameSite: true, // cookie so vai poder ser acessado nesse mesmo site
      httpOnly: true, // so vai poder ser acessado pelo contexto de requisicao e resposta, ou seja, nao vai ficar salvo no frontend
    }).status(200).send({
      token,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }

  return reply.status(200).send()
}
