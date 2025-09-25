import type { Student } from '../entity/student'
import type StudentsRepository from '../repository/studentRepository'

export default class FindStudentByIdUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(id: string): Promise<Student | null> {
    try {
      const student = await this.studentsRepository.findStudentById(id)
      return student
    } catch (error) {
      return null
    }
  }
}
