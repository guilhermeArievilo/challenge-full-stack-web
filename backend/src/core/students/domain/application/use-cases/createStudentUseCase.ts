import RequiredFieldError from "@/shared/exceptions/requiredFieldError";
import StudentsRepository, { CreateStudentDTO } from "../repository/studentsRepository";
import { ResourceAlreadyExistError } from "@/shared/exceptions/resourceAlreadyExistError";
import Student from "../../entity/student";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class CreateStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository
  ) {}

  async execute(data: CreateStudentDTO): Promise<Student> {
    const { name, cpf, ra, email } = data;

    if (!name) throw new RequiredFieldError("Name");
    if (!cpf) throw new RequiredFieldError("CPF");
    if (!ra) throw new RequiredFieldError("RA");
    if (!email) throw new RequiredFieldError("Email");

    const existingStudentByCpf = await this.studentsRepository.findByCpf(cpf);
    if (existingStudentByCpf) throw new ResourceAlreadyExistError("Student with this CPF already exists");

    const existingStudentByRa = await this.studentsRepository.findByRa(ra);
    if (existingStudentByRa) throw new ResourceAlreadyExistError("Student with this RA already exists");

    const existingStudentByEmail = await this.studentsRepository.findByEmail(email);
    if (existingStudentByEmail) throw new ResourceAlreadyExistError("Student with this Email already exists");

    return await this.studentsRepository.create(data);
  }
}