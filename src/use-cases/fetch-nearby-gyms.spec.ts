import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)

    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near gym',
      description: null,
      phone: null,
      latitude: -23.5265311,
      longitude: -46.5215895,
    })
    await gymsRepository.create({
      title: 'Far gym',
      description: null,
      phone: null,
      latitude: -23.487228,
      longitude: -46.131583,
    })
    const { gyms } = await sut.execute({
      userLatitude: -23.5265311,
      userLongitude: -46.5215895,
    })
    expect(gyms).toHaveLength(1) // Espero que o array checkins tenha no minimo 2 espacos
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near gym' })])
  })
})
