import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  searchMany(search: string, page: number): Promise<Gym[]>
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
// criando uma interface FindManyNearbyParams se obriga a enviar os parametros dessa forma, searchNearbyGyms({longitude: 12312312, latitude: 2102012}), ficando assim muito mais
// descritivo doq enviar searchNearbyGyms(21321312,12312321)
