import type { Student } from '../entity/student'
import type { UpdateStudentDTO } from '../repository/students-repository'
import type StudentsRepository from '../repository/students-repository'

export default class UpdateStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(id: string, params: UpdateStudentDTO): Promise<Student> {
    const student = await this.studentsRepository.updateStudent(id, params)
    return student
  }
}
