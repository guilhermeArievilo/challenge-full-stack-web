import type { RegisterDTO } from '@/features/auth/domain/entities/authEntities'
import type { User } from '../entity/user'

export default abstract class UserRepository {
  abstract findUser(): Promise<User>
  abstract saveUser(user: User): void
  abstract getLocalUser(): User | null
  abstract register(userData: RegisterDTO): Promise<User>
}
