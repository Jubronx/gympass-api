import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRespository } from '../check-ins-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInsRespository {
  async findById(id: string) {
    // Verifica se tem ids unicos
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })
    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return checkIns
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })
    return count
  }

  async findByUseIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date') // Comeco do dia
    const endOfTheDay = dayjs(date).endOf('date') // Fim do dia
    // procura qualquer checkin que tenha sido feito entre o comeco e o final do dia
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(), // greater than or equal -> maior que ou igual
          lte: endOfTheDay.toDate(), // lower than or equal -> menor que ou igual
        },
      },
    })
    return checkIn
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })
    return checkIn
  }

  async save(data: CheckIn): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })
    return checkIn
  }
}
