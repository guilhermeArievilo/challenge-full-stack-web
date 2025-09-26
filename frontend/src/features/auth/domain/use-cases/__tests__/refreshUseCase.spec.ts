import { describe, it, expect, vi } from 'vitest'
import RefreshUseCase from '../refreshUseCase'
import type AuthRepository from '../../repository/authRepository'
import type { TokenDto } from '../../entities/authEntities'

const mockToken: TokenDto = {
  accessToken: 'new-mock-token'
}

const mockAuthRepository: AuthRepository = {
  refreshToken: vi.fn().mockResolvedValue(mockToken),
  setAccessToken: vi.fn(),
  login: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
  getAccessToken: vi.fn(),
  clearAccessToken: vi.fn()
}

describe('RefreshUseCase', () => {
  it('should call refreshToken and setAccessToken and return a new token', async () => {
    const useCase = new RefreshUseCase(mockAuthRepository)

    const result = await useCase.execute()

    expect(mockAuthRepository.refreshToken).toHaveBeenCalled()
    expect(mockAuthRepository.setAccessToken).toHaveBeenCalledWith(mockToken.accessToken)
    expect(result).toBe(mockToken.accessToken)
  })

  it('should return null if refreshToken throws an error', async () => {
    vi.spyOn(mockAuthRepository, 'refreshToken').mockRejectedValueOnce(new Error('Refresh failed'))
    const useCase = new RefreshUseCase(mockAuthRepository)

    const result = await useCase.execute()

    expect(mockAuthRepository.refreshToken).toHaveBeenCalled()
    expect(result).toBeNull()
  })
})
