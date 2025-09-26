
import RequiredFieldError from "@/shared/exceptions/requiredFieldError";
import ResourceNotFoundError from "@/shared/exceptions/resourceNotFoundError";
import Student from "../../../entity/student";
import StudentsRepository from "../../repository/studentsRepository";
import DeleteStudentUseCase from "../deleteStudentUseCase";

describe('DeleteStudentUseCase', () => {
  let useCase: DeleteStudentUseCase;
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

    useCase = new DeleteStudentUseCase(studentsRepository);
  });

  it('should delete a student when a valid id is provided', async () => {
    const student = new Student({
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '12345678901',
      ra: 1001,
    }, 'mocked-id');

    studentsRepository.findById.mockResolvedValue(student);
    studentsRepository.delete.mockResolvedValue(undefined);

    await useCase.execute('mocked-id');

    expect(studentsRepository.findById).toHaveBeenCalledWith('mocked-id');
    expect(studentsRepository.delete).toHaveBeenCalledWith('mocked-id');
  });

  it('should throw RequiredFieldError if id is not provided', async () => {
    await expect(useCase.execute('')).rejects.toThrow(RequiredFieldError);
    expect(studentsRepository.delete).not.toHaveBeenCalled();
  });

  it('should throw ResourceNotFoundError if student does not exist', async () => {
    studentsRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('non-existent-id')).rejects.toThrow(ResourceNotFoundError);
    expect(studentsRepository.findById).toHaveBeenCalledWith('non-existent-id');
    expect(studentsRepository.delete).not.toHaveBeenCalled();
  });
});
