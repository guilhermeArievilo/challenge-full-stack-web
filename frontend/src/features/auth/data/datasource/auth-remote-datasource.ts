import api from '@/core/http/axios-client'
import type { LoginDTO, RegisterDTO, TokenDto } from '../../domain/entities/authEntities'
import type { Axios } from 'axios'

export default class AuthRemoteDatasource {
  constructor(private readonly apiClient: Axios) {}

  public async login(params: LoginDTO) {
    const res = await this.apiClient.post<TokenDto>('/auth/login', params)
    return res.data
  }

  public async register(params: RegisterDTO) {
    const res = await this.apiClient.post('/auth/register', params)
    return res.data
  }

  public async logout() {
    await this.apiClient.post('/auth/logout')
  }

  public async refreshToken() {
    const res = await this.apiClient.post<TokenDto>('/auth/refresh')
    return res.data
  }
}
