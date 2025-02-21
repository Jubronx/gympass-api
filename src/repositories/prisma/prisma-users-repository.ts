import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../users-repository'
// Todas as operacoes do banco de dados SEMPRE vao passar pelo repositories
export class PrismaUsersRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    // Verifica se tem ids duplicados
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }

  async findByEmail(email: string) {
    // Verifica se tem emails duplicados
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }
}
