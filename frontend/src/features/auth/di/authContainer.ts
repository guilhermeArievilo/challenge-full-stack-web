import api from '@/core/http/axiosClient'
import AuthRemoteDatasource from '../data/datasource/authRemoteDatasource'
import AuthRepositoryImpl from '../data/repository/authRepositoryImpl'
import { useAuthStore } from '../data/datasource/authStoreDatasource'
import LoginUseCase from '../domain/use-cases/loginUseCase'
import LogoutUseCase from '../domain/use-cases/logoutUseCase'
import RegisterUseCase from '../domain/use-cases/registerUseCase'
import RefreshUseCase from '../domain/use-cases/refreshUseCase'

export function createAuthContainer() {
  const authRemoteDatasource = new AuthRemoteDatasource(api)
  const authLocalDatasource = useAuthStore()

  const authRepository = new AuthRepositoryImpl(authRemoteDatasource, authLocalDatasource)

  return {
    login: new LoginUseCase(authRepository),
    logout: new LogoutUseCase(authRepository),
    register: new RegisterUseCase(authRepository),
    refresh: new RefreshUseCase(authRepository),
  }
}

export type AuthContainer = ReturnType<typeof createAuthContainer>
