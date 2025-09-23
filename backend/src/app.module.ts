import { Module } from '@nestjs/common';
import { UserModule } from './core/users/infra/user.module';
import { StudentModule } from './core/students/infra/student.module';

@Module({
  imports: [
    UserModule,
    StudentModule
  ],
})
export class AppModule {}
