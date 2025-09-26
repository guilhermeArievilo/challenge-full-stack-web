import { describe, it, expect, vi } from 'vitest'
import FindStudentsUseCase from '../findStudentUseCase'
import type {
  FindStudentsRequestDto,
  PaginatedFindStudentsResponse,
} from '../../repository/studentRepository'
import type StudentsRepository from '../../repository/studentRepository'
import type { Student } from '../../entity/student'

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Test Student 1',
    email: 'test1@example.com',
    cpf: '123.456.789-01',
    ra: 123451,
  },
  {
    id: '2',
    name: 'Test Student 2',
    email: 'test2@example.com',
    cpf: '123.456.789-02',
    ra: 123452,
  },
]

const mockPaginatedResponse: PaginatedFindStudentsResponse = {
  data: mockStudents,
  total: 2,
  page: 1,
  limit: 10,
}

const mockStudentRepository: StudentsRepository = {
  createStudent: vi.fn(),
  updateStudent: vi.fn(),
  findStudentById: vi.fn(),
  findStudents: vi.fn().mockResolvedValue(mockPaginatedResponse),
  deleteStudent: vi.fn(),
}

describe('FindStudentsUseCase', () => {
  it('should call findStudents and return a paginated response', async () => {
    const useCase = new FindStudentsUseCase(mockStudentRepository)
    const params: FindStudentsRequestDto = {
      page: 1,
      limit: 10,
      orderBy: 'name',
      order: 'asc',
      query: '',
    }

    const result = await useCase.execute(params)

    expect(mockStudentRepository.findStudents).toHaveBeenCalledWith(params)
    expect(result).toEqual(mockPaginatedResponse)
  })

  it('should use default params if not provided', async () => {
    const useCase = new FindStudentsUseCase(mockStudentRepository)

    await useCase.execute({})

    expect(mockStudentRepository.findStudents).toHaveBeenCalledWith({
      page: 1,
      limit: 20,
      orderBy: 'name',
      order: 'asc',
      query: undefined,
    })
  })

  it('should handle invalid page and limit', async () => {
    const useCase = new FindStudentsUseCase(mockStudentRepository)

    await useCase.execute({ page: 0, limit: 0, orderBy: 'name', order: 'asc', query: '' })

    expect(mockStudentRepository.findStudents).toHaveBeenCalledWith({
      page: 1,
      limit: 20,
      orderBy: 'name',
      order: 'asc',
      query: undefined,
    })
  })
})
