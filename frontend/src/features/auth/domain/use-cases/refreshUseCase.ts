import type AuthRepository from '../repository/authRepository'

export default class RefreshUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(): Promise<void> {
    const { accessToken } = await this.authRepository.refreshToken()
    this.authRepository.setAccessToken(accessToken)
  }
}
