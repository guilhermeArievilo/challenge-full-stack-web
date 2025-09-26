import { describe, it, expect, vi } from 'vitest'
import LoginUseCase from '../loginUseCase'
import type AuthRepository from '../../repository/authRepository'
import type { LoginDTO, TokenDto } from '../../entities/authEntities'

const mockToken: TokenDto = {
  accessToken: 'mock-token'
}

const mockAuthRepository: AuthRepository = {
  login: vi.fn().mockResolvedValue(mockToken),
  setAccessToken: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
  getAccessToken: vi.fn(),
  clearAccessToken: vi.fn(),
  refreshToken: vi.fn()
}

describe('LoginUseCase', () => {
  it('should throw an error if identifier is not provided', async () => {
    const useCase = new LoginUseCase(mockAuthRepository)
    const params: LoginDTO = { identifier: '', password: 'password' }

    await expect(useCase.execute(params)).rejects.toThrow('Identifier is required')
  })

  it('should throw an error if password is not provided', async () => {
    const useCase = new LoginUseCase(mockAuthRepository)
    const params: LoginDTO = { identifier: 'test', password: '' }

    await expect(useCase.execute(params)).rejects.toThrow('Password is required')
  })

  it('should call login and setAccessToken and return a token', async () => {
    const useCase = new LoginUseCase(mockAuthRepository)
    const params: LoginDTO = { identifier: 'test', password: 'password' }

    const result = await useCase.execute(params)

    expect(mockAuthRepository.login).toHaveBeenCalledWith(params)
    expect(mockAuthRepository.setAccessToken).toHaveBeenCalledWith(mockToken.accessToken)
    expect(result).toEqual(mockToken)
  })
})
