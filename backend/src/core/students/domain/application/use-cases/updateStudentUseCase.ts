import RequiredFieldError from "@/shared/exceptions/requiredFieldError";
import StudentsRepository, { UpdateStudentDTO } from "../repository/studentsRepository";
import { ResourceAlreadyExistError } from "@/shared/exceptions/resourceAlreadyExistError";
import Student from "../../entity/student";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class UpdateStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository
  ) {}

  async execute(id: string, data: UpdateStudentDTO): Promise<Student> {
    if (!id) throw new RequiredFieldError("ID");

    const { name, email } = data;

    if (!name) throw new RequiredFieldError("Name");
    if (!email) throw new RequiredFieldError("Email");

    const existingStudentByEmail = await this.studentsRepository.findByEmail(email);
    if (existingStudentByEmail) throw new ResourceAlreadyExistError("Student with this Email already exists");

    return await this.studentsRepository.update(id, data);
  }
}