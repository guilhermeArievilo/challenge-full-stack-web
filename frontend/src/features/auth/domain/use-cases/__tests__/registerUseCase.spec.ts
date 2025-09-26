import { describe, it, expect, vi } from 'vitest'
import RegisterUseCase from '../registerUseCase'
import type AuthRepository from '../../repository/authRepository'
import type { RegisterDTO, TokenDto } from '../../entities/authEntities'
import type { User } from '@/features/user/domain/entity/user'

const mockUser: User = {
  name: 'Test User',
  email: 'test@example.com'
}

const mockToken: TokenDto = {
  accessToken: 'mock-token'
}

const mockAuthRepository: AuthRepository = {
  register: vi.fn().mockResolvedValue(mockUser),
  login: vi.fn().mockResolvedValue(mockToken),
  setAccessToken: vi.fn(),
  logout: vi.fn(),
  getAccessToken: vi.fn(),
  clearAccessToken: vi.fn(),
  refreshToken: vi.fn()
}

describe('RegisterUseCase', () => {
  it('should throw an error if name is not provided', async () => {
    const useCase = new RegisterUseCase(mockAuthRepository)
    const params: RegisterDTO = { name: '', email: 'test@example.com', password: 'password' }

    await expect(useCase.execute(params)).rejects.toThrow('Nome é obrigatório')
  })

  it('should throw an error if email is not provided', async () => {
    const useCase = new RegisterUseCase(mockAuthRepository)
    const params: RegisterDTO = { name: 'Test User', email: '', password: 'password' }

    await expect(useCase.execute(params)).rejects.toThrow('Email é obrigatório')
  })

  it('should throw an error if password is not provided', async () => {
    const useCase = new RegisterUseCase(mockAuthRepository)
    const params: RegisterDTO = { name: 'Test User', email: 'test@example.com', password: '' }

    await expect(useCase.execute(params)).rejects.toThrow('Senha é obrigatória')
  })

  it('should call register, login, and setAccessToken and return a token', async () => {
    const useCase = new RegisterUseCase(mockAuthRepository)
    const params: RegisterDTO = { name: 'Test User', email: 'test@example.com', password: 'password' }

    const result = await useCase.execute(params)

    expect(mockAuthRepository.register).toHaveBeenCalledWith(params)
    expect(mockAuthRepository.login).toHaveBeenCalledWith({ identifier: params.email, password: params.password })
    expect(mockAuthRepository.setAccessToken).toHaveBeenCalledWith(mockToken.accessToken)
    expect(result).toEqual(mockToken)
  })
})
