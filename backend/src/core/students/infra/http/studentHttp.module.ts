import { Module } from "@nestjs/common";
import { StudentController } from "./controller/student.controller";
import { StudentDatabaseModule } from "../db/studentDatabase.module";
import CreateStudentUseCase from "../../domain/application/use-cases/createStudentUseCase";
import FindStudentByIdUseCase from "../../domain/application/use-cases/findStudentByIdUseCase";
import FindStudentsUseCase from "../../domain/application/use-cases/findStudentsUseCase";
import UpdateStudentUseCase from "../../domain/application/use-cases/updateStudentUseCase";
import DeleteStudentUseCase from "../../domain/application/use-cases/deleteStudentUseCase";

@Module({
  imports: [StudentDatabaseModule],
  controllers: [StudentController],
  providers: [
    CreateStudentUseCase,
    FindStudentByIdUseCase,
    FindStudentsUseCase,
    UpdateStudentUseCase,
    DeleteStudentUseCase,
  ],
})
export class StudentHttpModule {}