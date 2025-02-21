import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('CheckIn Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Stay batatafrits',
      description: '',
      phone: '',
      latitude: -23.5265311,
      longitude: -46.5215895,
    })

    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5265311,
      userLongitude: -46.5215895,
    })
    expect(checkIn.id).toEqual(expect.any(String)) // Espero que o id do usuario retornado seja igual a qualquer string
  })
  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2025, 0, 2, 8, 0, 0)) // 2 de janeiro de 2025
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5265311,
      userLongitude: -46.5215895,
    })
    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.5265311,
        userLongitude: -46.5215895,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2025, 0, 2, 0, 0, 0)) // 2 de janeiro de 2025
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5265311,
      userLongitude: -46.5215895,
    })
    vi.setSystemTime(new Date(2025, 1, 2, 0, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5265311,
      userLongitude: -46.5215895,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Stay batatafrits',
      description: '',
      latitude: new Decimal(-23.5265311),
      longitude: new Decimal(-46.5215895),
      phone: '',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -23.5324552,
        userLongitude: -46.5066368,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError) // Espero que o id do usuario retornado seja igual a qualquer string
  })
})
