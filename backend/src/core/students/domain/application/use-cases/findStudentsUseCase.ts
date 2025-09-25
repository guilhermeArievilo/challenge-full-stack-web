import { Injectable } from "@nestjs/common";
import StudentsRepository, { FindStudentsRequestDto, PaginatedFindStudentsResponse } from "../repository/studentsRepository";

@Injectable()
export default class FindStudentsUseCase {
  constructor(
    private studentsRepository: StudentsRepository
  ) {}

  async execute(params: FindStudentsRequestDto): Promise<PaginatedFindStudentsResponse> {
    const { page = 1, limit = 20, orderBy = 'name', order = 'asc', query='' } = params;
    
    return await this.studentsRepository.find({ page, limit, orderBy, order, query });
  }
}
