import type { Student } from '../entity/student'
import type { CreateStudentDTO } from '../repository/students-repository'
import type StudentsRepository from '../repository/students-repository'

export default class CreateStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(params: CreateStudentDTO): Promise<Student> {
    const student = await this.studentsRepository.createStudent(params)
    return student
  }
}
