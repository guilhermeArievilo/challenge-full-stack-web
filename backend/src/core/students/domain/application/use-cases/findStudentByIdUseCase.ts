import StudentsRepository from "../repository/studentsRepository";
import RequiredFieldError from "@/shared/exceptions/requiredFieldError";
import ResourceNotFoundError from "@/shared/exceptions/resourceNotFoundError";
import { Injectable } from "@nestjs/common";
import Student from "../../entity/student";

@Injectable()
export default class FindStudentByIdUseCase {
  constructor(
    private studentsRepository: StudentsRepository
  ) {}

  async execute(id: string): Promise<Student> {
    if (!id) throw new RequiredFieldError("ID");

    const student = await this.studentsRepository.findById(id);
    if (!student) throw new ResourceNotFoundError("Student");

    return student;
  }
}