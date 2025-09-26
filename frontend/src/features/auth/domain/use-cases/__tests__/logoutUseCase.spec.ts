import { describe, it, expect, vi } from 'vitest'
import LogoutUseCase from '../logoutUseCase'
import type AuthRepository from '../../repository/authRepository'

const mockAuthRepository: AuthRepository = {
  logout: vi.fn(),
  clearAccessToken: vi.fn(),
  login: vi.fn(),
  register: vi.fn(),
  setAccessToken: vi.fn(),
  getAccessToken: vi.fn(),
  refreshToken: vi.fn()
}

describe('LogoutUseCase', () => {
  it('should call logout and clearAccessToken', async () => {
    const useCase = new LogoutUseCase(mockAuthRepository)

    await useCase.execute()

    expect(mockAuthRepository.logout).toHaveBeenCalled()
    expect(mockAuthRepository.clearAccessToken).toHaveBeenCalled()
  })
})
