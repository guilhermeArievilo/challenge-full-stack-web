import { describe, it, expect, vi } from 'vitest'
import DeleteStudentUseCase from '../deleteStudentUseCase'
import type StudentsRepository from '../../repository/studentRepository'

const mockStudentRepository: StudentsRepository = {
  createStudent: vi.fn(),
  updateStudent: vi.fn(),
  findStudentById: vi.fn(),
  findStudents: vi.fn(),
  deleteStudent: vi.fn()
}

describe('DeleteStudentUseCase', () => {
  it('should call deleteStudent with the correct id', async () => {
    const useCase = new DeleteStudentUseCase(mockStudentRepository)
    const studentId = '1'

    await useCase.execute(studentId)

    expect(mockStudentRepository.deleteStudent).toHaveBeenCalledWith(studentId)
  })
})
