import type { Student } from '../entity/student'
import type { CreateStudentDTO } from '../repository/studentRepository'
import type StudentsRepository from '../repository/studentRepository'

export default class CreateStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(params: CreateStudentDTO): Promise<Student> {
    const student = await this.studentsRepository.createStudent(params)
    return student
  }
}
