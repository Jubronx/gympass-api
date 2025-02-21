import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let userRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(userRepository)
  })
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Fulano',
      email: 'fulano@gmail.com',
      password: '123456',
    })
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )
    expect(user.id).toEqual(expect.any(String)) // Espero que o id do usuario retornado seja igual a qualquer string
  })
  it('should hash user password upon registration ', async () => {
    const { user } = await sut.execute({
      name: 'Fulano',
      email: 'fulano@gmail.com',
      password: '123456',
    })
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
  it('should not be able to register with same email twice', async () => {
    const email = 'fulano@exemplo.com'

    const { user } = await sut.execute({
      name: 'Fulano',
      email,
      password: '123456',
    })
    // sempre que for usar uma promise dentro do expect precisa colocar ele como await
    await expect(() =>
      sut.execute({
        name: 'Fulano',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError) // Espero que ao executar o execute() a segunda vez seja rejeitado e o erro seja uma instancia de UserAlreadyExistsError
  })
})
