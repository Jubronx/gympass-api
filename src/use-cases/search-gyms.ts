import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { Gym, User } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface SearchGymsUseCaseParams {
  search: string
  page: number
}
interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}
// D - Inversao de dependencias

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}
  async execute({
    search,
    page,
  }: SearchGymsUseCaseParams): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(search, page)
    return {
      gyms,
    }
  }
}
