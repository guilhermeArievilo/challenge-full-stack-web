import RequiredFieldError from "@/shared/exceptions/requiredFieldError";
import Student from "../../entity/student";
import StudentsRepository from "../repository/studentsRepository";
import FindStudentByIdUseCase from "./findStudentByIdUseCase";
import ResourceNotFoundError from "@/shared/exceptions/resourceNotFoundError";


describe('FindStudentByIdUseCase', () => {
  let useCase: FindStudentByIdUseCase;
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

    useCase = new FindStudentByIdUseCase(studentsRepository);
  });

  it('should return a student when a valid id is provided', async () => {
    const student = new Student({
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '12345678901',
      ra: 1001,
    }, 'mocked-id');

    studentsRepository.findById.mockResolvedValue(student);

    const result = await useCase.execute('mocked-id');

    expect(studentsRepository.findById).toHaveBeenCalledWith('mocked-id');
    expect(result).toBe(student);
  });

  it('should throw RequiredFieldError if id is not provided', async () => {
    await expect(useCase.execute('')).rejects.toThrow(RequiredFieldError);
    expect(studentsRepository.findById).not.toHaveBeenCalled();
  });

  it('should throw ResourceNotFoundError if student does not exist', async () => {
    studentsRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('non-existent-id')).rejects.toThrow(ResourceNotFoundError);
    expect(studentsRepository.findById).toHaveBeenCalledWith('non-existent-id');
  });
});
