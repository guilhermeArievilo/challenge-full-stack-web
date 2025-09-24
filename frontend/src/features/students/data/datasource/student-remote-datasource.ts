import type { Axios } from 'axios'
import type {
  CreateStudentDTO,
  FindStudentsRequestDto,
  PaginatedFindStudentsResponse,
  UpdateStudentDTO,
} from '../../domain/repository/students-repository'
import type { Student } from '../../domain/entity/student'

export default class StudentRemoteDatasource {
  constructor(private readonly apiClient: Axios) {}

  public async create(studentToCreate: CreateStudentDTO) {
    const res = await this.apiClient.post<Student>('/students', studentToCreate)
    return res.data
  }

  public async findById(id: string) {
    const res = await this.apiClient.get<Student>(`/students/${id}`)
    return res.data
  }

  public async find({ page, limit, orderBy, order, query }: FindStudentsRequestDto) {
    const queryParams = new URLSearchParams()

    if (page !== undefined) queryParams.append('page', String(page))
    if (limit !== undefined) queryParams.append('limit', String(limit))
    if (orderBy) queryParams.append('orderBy', orderBy)
    if (order) queryParams.append('order', order)
    if (query) queryParams.append('query', query)

    const url = `/students?${queryParams.toString()}`
    const res = await this.apiClient.get<PaginatedFindStudentsResponse>(url)
    return res.data
  }

  public async update(id: string, studentToUpdate: UpdateStudentDTO) {
    const res = await this.apiClient.put<Student>(`/students/${id}`, studentToUpdate)
    return res.data
  }

  public async delete(id: string) {
    await this.apiClient.delete(`/students/${id}`)
  }
}
