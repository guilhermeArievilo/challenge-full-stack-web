
import Student from "../../entity/student";
import StudentsRepository, { PaginatedFindStudentsResponse } from "../repository/studentsRepository";
import FindStudentsUseCase from "./findStudentsUseCase";

describe('FindStudentsUseCase', () => {
  let useCase: FindStudentsUseCase;
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

    useCase = new FindStudentsUseCase(studentsRepository);
  });

  it('should call the find method with default parameters', async () => {
    const paginatedResponse: PaginatedFindStudentsResponse = {
      data: [],
      total: 0,
      page: 1,
      limit: 20,
    };
    studentsRepository.find.mockResolvedValue(paginatedResponse);

    const result = await useCase.execute({});

    expect(studentsRepository.find).toHaveBeenCalledWith({ page: 1, limit: 20, orderBy: 'name', order: 'asc', query: '' });
    expect(result).toBe(paginatedResponse);
  });

  it('should call the find method with provided parameters', async () => {
    const student = new Student({
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '12345678901',
      ra: 1001,
    }, 'mocked-id');

    const paginatedResponse: PaginatedFindStudentsResponse = {
      data: [student],
      total: 1,
      page: 2,
      limit: 10,
    };
    studentsRepository.find.mockResolvedValue(paginatedResponse);

    const result = await useCase.execute({ page: 2, limit: 10, orderBy: 'email', order: 'desc', query: 'John' });

    expect(studentsRepository.find).toHaveBeenCalledWith({ page: 2, limit: 10, orderBy: 'email', order: 'desc', query: 'John' });
    expect(result).toBe(paginatedResponse);
  });
});
