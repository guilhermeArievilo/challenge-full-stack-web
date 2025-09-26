import { describe, it, expect, vi } from 'vitest'
import CreateStudentUseCase from '../createStudentUseCase'
import type { CreateStudentDTO } from '../../repository/studentRepository'
import type StudentsRepository from '../../repository/studentRepository'
import type { Student } from '../../entity/student'

const mockStudent: Student = {
  id: '1',
  name: 'Test Student',
  email: 'test@example.com',
  cpf: '123.456.789-00',
  ra: 123456
}

const mockStudentRepository: StudentsRepository = {
  createStudent: vi.fn().mockResolvedValue(mockStudent),
  updateStudent: vi.fn(),
  findStudentById: vi.fn(),
  findStudents: vi.fn(),
  deleteStudent: vi.fn()
}

describe('CreateStudentUseCase', () => {
  it('should call createStudent and return a student', async () => {
    const useCase = new CreateStudentUseCase(mockStudentRepository)
    const params: CreateStudentDTO = {
      name: 'Test Student',
      email: 'test@example.com',
      cpf: '123.456.789-00',
      ra: 123456
    }

    const result = await useCase.execute(params)

    expect(mockStudentRepository.createStudent).toHaveBeenCalledWith(params)
    expect(result).toEqual(mockStudent)
  })
})
