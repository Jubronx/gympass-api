import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333), // coerse pega qualquer dado e converte o valor para um numero
})

const _env = envSchema.safeParse(process.env) // safeParse -> tenta validar o process.env pra ver se ele tem as mesmas informacoes de dentro do z.object

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
