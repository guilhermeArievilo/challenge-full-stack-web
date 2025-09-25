import type UserRepository from '@/features/user/domain/repository/userRepository'
import type { LoginDTO, TokenDto, RegisterDTO } from '../../domain/entities/authEntities'
import type AuthRepository from '../../domain/repository/authRepository'
import AuthRemoteDatasource from '../datasource/authRemoteDatasource'
import { type AuthStoreDatasource } from '../datasource/authStoreDatasource'
import type { User } from '@/features/user/domain/entity/user'

export default class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authRemoteDatasource: AuthRemoteDatasource,
    private readonly authLocalDatasource: AuthStoreDatasource,
  ) {}

  async refreshToken(): Promise<TokenDto> {
    return this.authRemoteDatasource.refreshToken()
  }

  async login(params: LoginDTO): Promise<TokenDto> {
    return await this.authRemoteDatasource.login(params)
  }

  async register(params: RegisterDTO): Promise<User> {
    return await this.userRepository.register(params)
  }

  async logout(): Promise<void> {
    return await this.authRemoteDatasource.logout()
  }
  setAccessToken(token: string): void {
    this.authLocalDatasource.setToken(token)
  }
  getAccessToken(): string | null {
    return this.authLocalDatasource.accessToken
  }
  clearAccessToken(): void {
    this.authLocalDatasource.clearToken()
  }
}
