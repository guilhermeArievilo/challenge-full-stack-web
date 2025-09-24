import type { RegisterDTO, TokenDto } from '../entities/authEntities'
import type AuthRepository from '../repository/authRepository'

export default class RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(params: RegisterDTO): Promise<TokenDto> {
    const { name, email, password } = params

    if (!name) {
      throw new Error('Name is required')
    }

    if (!email) {
      throw new Error('Name is required')
    }

    if (!password) {
      throw new Error('Password is required')
    }

    await this.authRepository.register(params)
    const { accessToken } = await this.authRepository.login({ identifier: email, password })
    this.authRepository.setAccessToken(accessToken)
    return { accessToken }
  }
}
