
import { ResourceAlreadyExistError } from "@/shared/exceptions/resourceAlreadyExistError";
import RequiredFieldError from "@/shared/exceptions/requiredFieldError";
import Student from "../../entity/student";
import StudentsRepository, { UpdateStudentDTO } from "../repository/studentsRepository";
import UpdateStudentUseCase from "./updateStudentUseCase";

describe('UpdateStudentUseCase', () => {
  let useCase: UpdateStudentUseCase;
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

    useCase = new UpdateStudentUseCase(studentsRepository);
  });

  it('should update a student when valid data is provided', async () => {
    const studentData: UpdateStudentDTO = {
      name: 'John Doe Updated',
      email: 'john.updated@example.com',
    };

    const student = new Student({
      name: 'John Doe Updated',
      email: 'john.updated@example.com',
      cpf: '12345678901',
      ra: 1001,
    }, 'mocked-id');

    studentsRepository.findByEmail.mockResolvedValue(null);
    studentsRepository.update.mockResolvedValue(student);

    const result = await useCase.execute('mocked-id', studentData);

    expect(studentsRepository.update).toHaveBeenCalledWith('mocked-id', studentData);
    expect(result).toBe(student);
  });

  it('should throw RequiredFieldError if id is not provided', async () => {
    const studentData: UpdateStudentDTO = {
      name: 'John Doe Updated',
    };

    await expect(useCase.execute('', studentData)).rejects.toThrow(RequiredFieldError);
  });

  it('should throw ResourceAlreadyExistError if email already exists', async () => {
    const studentData: UpdateStudentDTO = {
      email: 'existing@example.com',
    };

    const existingStudent = new Student({
        name: 'Jane Doe',
        email: 'existing@example.com',
        cpf: '12345678902',
        ra: 1002,
    }, 'existing-id');

    studentsRepository.findByEmail.mockResolvedValue(existingStudent);

    await expect(useCase.execute('mocked-id', studentData)).rejects.toThrow(ResourceAlreadyExistError);
  });

  it('should update the name without changing the email', async () => {
    const studentData: UpdateStudentDTO = {
      name: 'John Doe Updated',
    };

    const student = new Student({
      name: 'John Doe Updated',
      email: 'john@example.com',
      cpf: '12345678901',
      ra: 1001,
    }, 'mocked-id');

    studentsRepository.update.mockResolvedValue(student);

    const result = await useCase.execute('mocked-id', studentData);

    expect(studentsRepository.update).toHaveBeenCalledWith('mocked-id', studentData);
    expect(result).toBe(student);
  });
});
