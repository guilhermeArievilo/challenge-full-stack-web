import api from '@/core/http/axiosClient'
import StudentRemoteDatasource from '../data/datasource/studentRemoteDatasource'
import StudentRepositoryImpl from '../data/repository/studentRepositoryImpl'
import CreateStudentUseCase from '../domain/use-cases/createStudentUseCase'
import UpdateStudentUseCase from '../domain/use-cases/updateStudentUseCase'
import FindStudentByIdUseCase from '../domain/use-cases/findStudentByIdUseCase'
import FindStudentsUseCase from '../domain/use-cases/findStudentUseCase'
import DeleteStudentUseCase from '../domain/use-cases/deleteStudentUseCase'

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
