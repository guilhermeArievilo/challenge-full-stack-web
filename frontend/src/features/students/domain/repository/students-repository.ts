import type { Student } from '../entity/student'

export type CreateStudentDTO = {
  name: string
  email: string
  cpf: string
  ra: number
}

export type UpdateStudentDTO = {
  name?: string
  email?: string
}

export type FindStudentsRequestDto = {
  page?: number
  limit?: number
  orderBy?: keyof CreateStudentDTO
  order?: 'asc' | 'desc'
  query?: string
}

export type PaginatedFindStudentsResponse = {
  data: Student[]
  total: number
  page: number
  limit: number
}

export default abstract class StudentsRepository {
  abstract createStudent(student: CreateStudentDTO): Promise<Student>
  abstract updateStudent(id: string, student: UpdateStudentDTO): Promise<Student>
  abstract findStudentById(id: string): Promise<Student>
  abstract findStudents(params: FindStudentsRequestDto): Promise<PaginatedFindStudentsResponse>
  abstract deleteStudent(id: string): Promise<void>
}
