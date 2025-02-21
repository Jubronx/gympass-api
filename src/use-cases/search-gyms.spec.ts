import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)

    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Tamis gym',
      description: null,
      phone: null,
      latitude: -23.5265311,
      longitude: -46.5215895,
    })
    await gymsRepository.create({
      title: 'Stay gym',
      description: null,
      phone: null,
      latitude: -23.5265311,
      longitude: -46.5215895,
    })
    const { gyms } = await sut.execute({
      search: 'Tamis',
      page: 1,
    })
    expect(gyms).toHaveLength(1) // Espero que o array checkins tenha no minimo 2 espacos
    expect(gyms).toEqual([expect.objectContaining({ title: 'Tamis gym' })])
  })
  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Stay gym-${i}`,
        description: null,
        phone: null,
        latitude: -23.5265311,
        longitude: -46.5215895,
      })
    }
    const { gyms } = await sut.execute({
      search: 'Stay',
      page: 2,
    })

    expect(gyms).toHaveLength(2) // Espero que o array checkins tenha no minimo 2 espacos
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Stay gym-21' }),
      expect.objectContaining({ title: 'Stay gym-22' }),
    ])
  })
})
