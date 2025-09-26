import { describe, it, expect, vi } from 'vitest'
import FindStudentByIdUseCase from '../findStudentByIdUseCase'
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
  createStudent: vi.fn(),
  updateStudent: vi.fn(),
  findStudentById: vi.fn().mockResolvedValue(mockStudent),
  findStudents: vi.fn(),
  deleteStudent: vi.fn()
}

describe('FindStudentByIdUseCase', () => {
  it('should call findStudentById and return a student', async () => {
    const useCase = new FindStudentByIdUseCase(mockStudentRepository)
    const studentId = '1'

    const result = await useCase.execute(studentId)

    expect(mockStudentRepository.findStudentById).toHaveBeenCalledWith(studentId)
    expect(result).toEqual(mockStudent)
  })

  it('should return null if findStudentById throws an error', async () => {
    vi.spyOn(mockStudentRepository, 'findStudentById').mockRejectedValueOnce(new Error('Student not found'))
    const useCase = new FindStudentByIdUseCase(mockStudentRepository)
    const studentId = '2'

    const result = await useCase.execute(studentId)

    expect(mockStudentRepository.findStudentById).toHaveBeenCalledWith(studentId)
    expect(result).toBeNull()
  })
})
