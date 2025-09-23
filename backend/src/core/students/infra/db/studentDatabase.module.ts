import { PrismaService } from "@/shared/infra/db/prisma/database.service";
import { Module } from "@nestjs/common";
import StudentsRepository from "../../domain/application/repository/studentsRepository";
import StudentRepositoryImpl from "./prisma/repository/studentRepositoryImpl";

@Module({
  providers: [
    PrismaService,
    {
      provide: StudentsRepository,
      useClass: StudentRepositoryImpl,
    },
  ],
  exports: [StudentsRepository],
})
export class StudentDatabaseModule {}