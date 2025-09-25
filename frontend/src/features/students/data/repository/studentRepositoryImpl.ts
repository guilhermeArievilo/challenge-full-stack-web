import type { Student } from '../../domain/entity/student'
import type {
  CreateStudentDTO,
  UpdateStudentDTO,
  FindStudentsRequestDto,
  PaginatedFindStudentsResponse,
} from '../../domain/repository/studentRepository'
import type StudentsRepository from '../../domain/repository/studentRepository'
import type StudentRemoteDatasource from '../datasource/studentRemoteDatasource'

export default class StudentRepositoryImpl implements StudentsRepository {
  constructor(private readonly studentRemoteDatasource: StudentRemoteDatasource) {}

  async createStudent(student: CreateStudentDTO): Promise<Student> {
    return await this.studentRemoteDatasource.create(student)
  }

  async updateStudent(id: string, student: UpdateStudentDTO): Promise<Student> {
    return await this.studentRemoteDatasource.update(id, student)
  }

  async findStudentById(id: string): Promise<Student> {
    return await this.studentRemoteDatasource.findById(id)
  }

  async findStudents(params: FindStudentsRequestDto): Promise<PaginatedFindStudentsResponse> {
    return await this.studentRemoteDatasource.find(params)
  }

  async deleteStudent(id: string): Promise<void> {
    return await this.studentRemoteDatasource.delete(id)
  }
}
