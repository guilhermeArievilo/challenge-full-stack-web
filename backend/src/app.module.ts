import { Module } from '@nestjs/common';
import { UserModule } from './core/users/infra/user.module';
import { StudentModule } from './core/students/infra/student.module';
import { AuthModule } from './core/auth/infra/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    StudentModule
  ],
})
export class AppModule {}
