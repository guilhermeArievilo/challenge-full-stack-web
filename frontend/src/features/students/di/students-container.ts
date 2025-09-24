import api from '@/core/http/axios-client'
import StudentRemoteDatasource from '../data/datasource/student-remote-datasource'
import StudentRepositoryImpl from '../data/repository/student-repository-impl'
import CreateStudentUseCase from '../domain/use-cases/create-student-use-case'
import UpdateStudentUseCase from '../domain/use-cases/update-student-use-case'
import FindStudentByIdUseCase from '../domain/use-cases/find-student-by-id-use-case'
import FindStudentsUseCase from '../domain/use-cases/find-students-use-case'
import DeleteStudentUseCase from '../domain/use-cases/delete-student-use-case'

export function createStudentContainer() {
  const studentRemoteDatasource = new StudentRemoteDatasource(api)

  const studentRepositoryImpl = new StudentRepositoryImpl(studentRemoteDatasource)

  return {
    createStudent: new CreateStudentUseCase(studentRepositoryImpl),
    updateStudent: new UpdateStudentUseCase(studentRepositoryImpl),
    findStudentById: new FindStudentByIdUseCase(studentRepositoryImpl),
    findStudents: new FindStudentsUseCase(studentRepositoryImpl),
    deleteStudent: new DeleteStudentUseCase(studentRepositoryImpl),
  }
}

export type StudentContainer = ReturnType<typeof createStudentContainer>
