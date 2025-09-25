import type StudentsRepository from '../repository/studentRepository'

export default class DeleteStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(id: string): Promise<void> {
    await this.studentsRepository.deleteStudent(id)
  }
}
