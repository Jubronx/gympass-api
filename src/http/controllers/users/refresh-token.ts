import { FastifyRequest, FastifyReply } from 'fastify'

export async function refreshToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify({onlyCookie: true})

const { role } = request.user

const token = await reply.jwtSign(
    {
      role
    },
    {
    sign: {
        sub: request.user.sub,
    },
    },
)
const refreshToken = await reply.jwtSign(
    {role},
    {
    sign: {
        sub: request.user.sub,
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

  return reply.status(200).send()
}
