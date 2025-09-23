import Student, { StudentProps } from "../../entity/student";

export type CreateStudentDTO = {
  name: string;
  email: string;
  cpf: string;
  ra: number;
}

export type UpdateStudentDTO = {
  name?: string;
  email?: string;
}

export type FindStudentsRequestDto = {
  page?: number;
  limit?: number;
  orderBy?: keyof StudentProps;
  order?: 'asc' | 'desc';
  query?: string;
}

export type PaginatedFindStudentsResponse = {
  data: Student[];
  total: number;
  page: number;
  limit: number;
};

export default abstract class StudentsRepository {
  abstract create(data: CreateStudentDTO): Promise<Student>;
  abstract findById(id: string): Promise<Student | null>;
  abstract findByCpf(cpf: string): Promise<Student | null>;
  abstract findByEmail(email: string): Promise<Student | null>;
  abstract findByRa(ra: number): Promise<Student | null>;
  abstract find(params: FindStudentsRequestDto): Promise<PaginatedFindStudentsResponse>;
  abstract update(id: string, data: UpdateStudentDTO): Promise<Student>;
  abstract delete(id: string): Promise<void>;
}