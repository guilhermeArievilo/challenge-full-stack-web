import { describe, it, expect, vi } from 'vitest'
import UpdateStudentUseCase from '../updateStudentUseCase'
import type { UpdateStudentDTO } from '../../repository/studentRepository'
import type StudentsRepository from '../../repository/studentRepository'
import type { Student } from '../../entity/student'

const mockStudent: Student = {
  id: '1',
  name: 'Updated Student',
  email: 'updated@example.com',
  cpf: '123.456.789-00',
  ra: 123456
}

const mockStudentRepository: StudentsRepository = {
  createStudent: vi.fn(),
  updateStudent: vi.fn().mockResolvedValue(mockStudent),
  findStudentById: vi.fn(),
  findStudents: vi.fn(),
  deleteStudent: vi.fn()
}

describe('UpdateStudentUseCase', () => {
  it('should call updateStudent and return the updated student', async () => {
    const useCase = new UpdateStudentUseCase(mockStudentRepository)
    const studentId = '1'
    const params: UpdateStudentDTO = {
      name: 'Updated Student',
      email: 'updated@example.com'
    }

    const result = await useCase.execute(studentId, params)

    expect(mockStudentRepository.updateStudent).toHaveBeenCalledWith(studentId, params)
    expect(result).toEqual(mockStudent)
  })
})
