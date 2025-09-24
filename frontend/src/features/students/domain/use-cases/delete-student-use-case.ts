import type StudentsRepository from '../repository/students-repository'

export default class DeleteStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(id: string): Promise<void> {
    await this.studentsRepository.deleteStudent(id)
  }
}
