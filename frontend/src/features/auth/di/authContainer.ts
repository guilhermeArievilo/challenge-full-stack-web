import api from '@/core/http/axios-client'
import AuthRemoteDatasource from '../data/datasource/authRemoteDatasource'
import AuthRepositoryImpl from '../data/repository/authRepositoryImpl'
import { useAuthStore } from '../data/datasource/authStoreDatasource'
import LoginUseCase from '../domain/use-cases/loginUseCase'
import LogoutUseCase from '../domain/use-cases/logoutUseCase'
import RegisterUseCase from '../domain/use-cases/registerUseCase'
import RefreshUseCase from '../domain/use-cases/refreshUseCase'
import UserRemoteDatasource from '@/features/user/data/datasource/userRemoteDatasource'
import UserRepositoryImpl from '@/features/user/data/repository/userRepositoryImpl'
import { useUserStore } from '@/features/user/data/datasource/userStoreDatasource'

export function createAuthContainer() {
  const authRemoteDatasource = new AuthRemoteDatasource(api)
  const userRemoteDatasource = new UserRemoteDatasource(api)
  const authLocalDatasource = useAuthStore()
  const userLocalDatasource = useUserStore()

  const userRepositoryImpl = new UserRepositoryImpl(userRemoteDatasource, userLocalDatasource)
  const authRepository = new AuthRepositoryImpl(
    userRepositoryImpl,
    authRemoteDatasource,
    authLocalDatasource,
  )

  return {
    login: new LoginUseCase(authRepository),
    logout: new LogoutUseCase(authRepository),
    register: new RegisterUseCase(authRepository),
    refresh: new RefreshUseCase(authRepository),
  }
}

export type AuthContainer = ReturnType<typeof createAuthContainer>
