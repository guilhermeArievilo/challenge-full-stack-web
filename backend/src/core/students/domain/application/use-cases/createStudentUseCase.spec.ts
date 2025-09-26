
import { ResourceAlreadyExistError } from "@/shared/exceptions/resourceAlreadyExistError";
import RequiredFieldError from "@/shared/exceptions/requiredFieldError";
import Student from "../../entity/student";
import StudentsRepository, { CreateStudentDTO } from "../repository/studentsRepository";
import CreateStudentUseCase from "./createStudentUseCase";

describe('CreateStudentUseCase', () => {
  let useCase: CreateStudentUseCase;
  let studentsRepository: jest.Mocked<StudentsRepository>;

  beforeEach(() => {
    studentsRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByCpf: jest.fn(),
      findByEmail: jest.fn(),
      findByRa: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new CreateStudentUseCase(studentsRepository);
  });

  it('should create a student when valid data is provided', async () => {
    const studentData: CreateStudentDTO = {
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '12345678901',
      ra: 1001,
    };

    const student = new Student(studentData, 'mocked-id');
    studentsRepository.create.mockResolvedValue(student);
    studentsRepository.findByCpf.mockResolvedValue(null);
    studentsRepository.findByRa.mockResolvedValue(null);
    studentsRepository.findByEmail.mockResolvedValue(null);

    const result = await useCase.execute(studentData);

    expect(studentsRepository.create).toHaveBeenCalledWith(studentData);
    expect(result).toBe(student);
  });

  it('should throw RequiredFieldError if name is not provided', async () => {
    const studentData: CreateStudentDTO = {
      name: '',
      email: 'john@example.com',
      cpf: '12345678901',
      ra: 1001,
    };

    await expect(useCase.execute(studentData)).rejects.toThrow(RequiredFieldError);
  });

  it('should throw RequiredFieldError if cpf is not provided', async () => {
    const studentData: CreateStudentDTO = {
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '',
      ra: 1001,
    };

    await expect(useCase.execute(studentData)).rejects.toThrow(RequiredFieldError);
  });

  it('should throw RequiredFieldError if ra is not provided', async () => {
    const studentData: any = {
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '12345678901',
    };

    await expect(useCase.execute(studentData)).rejects.toThrow(RequiredFieldError);
  });

  it('should throw RequiredFieldError if email is not provided', async () => {
    const studentData: CreateStudentDTO = {
      name: 'John Doe',
      email: '',
      cpf: '12345678901',
      ra: 1001,
    };

    await expect(useCase.execute(studentData)).rejects.toThrow(RequiredFieldError);
  });

  it('should throw ResourceAlreadyExistError if cpf already exists', async () => {
    const studentData: CreateStudentDTO = {
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '12345678901',
      ra: 1001,
    };

    const existingStudent = new Student(studentData, 'existing-id');
    studentsRepository.findByCpf.mockResolvedValue(existingStudent);

    await expect(useCase.execute(studentData)).rejects.toThrow(ResourceAlreadyExistError);
  });

  it('should throw ResourceAlreadyExistError if ra already exists', async () => {
    const studentData: CreateStudentDTO = {
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '12345678901',
      ra: 1001,
    };

    const existingStudent = new Student(studentData, 'existing-id');
    studentsRepository.findByCpf.mockResolvedValue(null);
    studentsRepository.findByRa.mockResolvedValue(existingStudent);

    await expect(useCase.execute(studentData)).rejects.toThrow(ResourceAlreadyExistError);
  });

  it('should throw ResourceAlreadyExistError if email already exists', async () => {
    const studentData: CreateStudentDTO = {
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '12345678901',
      ra: 1001,
    };

    const existingStudent = new Student(studentData, 'existing-id');
    studentsRepository.findByCpf.mockResolvedValue(null);
    studentsRepository.findByRa.mockResolvedValue(null);
    studentsRepository.findByEmail.mockResolvedValue(existingStudent);

    await expect(useCase.execute(studentData)).rejects.toThrow(ResourceAlreadyExistError);
  });
});
