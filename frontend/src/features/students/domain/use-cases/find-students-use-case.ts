import type {
  FindStudentsRequestDto,
  PaginatedFindStudentsResponse,
} from '../repository/students-repository'
import type StudentsRepository from '../repository/students-repository'

export default class FindStudentsUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute({
    page = 1,
    limit = 20,
    orderBy = 'name',
    order = 'asc',
    query,
  }: FindStudentsRequestDto): Promise<PaginatedFindStudentsResponse> {
    if (page < 1) page = 1
    if (limit < 1) limit = 20
    return await this.studentsRepository.findStudents({ page, limit, orderBy, order, query })
  }
}
