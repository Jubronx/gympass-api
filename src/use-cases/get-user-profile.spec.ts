import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let userRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    // Pattern sut - system under test -> variavel principal que pode ser replicada em todos os testes
    sut = new GetUserProfileUseCase(userRepository)
  })
  it('should be able to get user profile', async () => {
    const createdUser = await userRepository.create({
      name: 'Fulano da Silva',
      email: 'fulano@gmail.com',
      password_hash: await hash('123456', 6),
    })
    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('Fulano da Silva') // Espero que o id do usuario retornado seja igual a qualquer string
  })

  it('should not be able to get user profile with wrong id', async () => {
    await userRepository.create({
      name: 'Fulano da Silva',
      email: 'fulano@gmail.com',
      password_hash: await hash('123456', 6),
    })
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
