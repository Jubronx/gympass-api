import { expect, describe, it, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let userRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    // Pattern sut - system under test -> variavel principal que pode ser replicada em todos os testes
    sut = new AuthenticateUseCase(userRepository)
  })
  it('should be able to authenticate', async () => {
    await userRepository.create({
      name: 'Fulano da Silva',
      email: 'fulano@gmail.com',
      password_hash: await hash('123456', 6),
    })
    const { user } = await sut.execute({
      email: 'fulano@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String)) // Espero que o id do usuario retornado seja igual a qualquer string
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'fulano@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      name: 'Fulano da Silva',
      email: 'fulano@gmail.com',
      password_hash: await hash('123456', 6),
    })
    await expect(() =>
      sut.execute({
        email: 'fulano@gmail.com',
        password: '12345612',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
