import RequiredFieldError from "@/shared/exceptions/requiredFieldError";
import StudentsRepository from "../repository/studentsRepository";
import ResourceNotFoundError from "@/shared/exceptions/resourceNotFoundError";

export default class UpdateStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository
  ) {}

  async execute(id: string): Promise<void> {
    if (!id) throw new RequiredFieldError("ID");

    const student = await this.studentsRepository.findById(id);
    if (!student) throw new ResourceNotFoundError("Student");

    await this.studentsRepository.delete(id);
  }
}