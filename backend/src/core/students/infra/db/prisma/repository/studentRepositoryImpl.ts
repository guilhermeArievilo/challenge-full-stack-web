import StudentsRepository, { CreateStudentDTO, FindStudentsRequestDto, PaginatedFindStudentsResponse, UpdateStudentDTO } from "@/core/students/domain/application/repository/studentsRepository";
import Student from "@/core/students/domain/entity/student";
import { PrismaService } from "@/shared/infra/db/prisma/database.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import StudentPrismaMapper from "../mapper/studentPrismaMapper";


@Injectable()
export default class StudentRepositoryImpl implements StudentsRepository {
  constructor(
    private prismaService: PrismaService
  ) {}

  async create(data: CreateStudentDTO): Promise<Student> {
    const rawStudentData = await this.prismaService.student.create({ data });

    return StudentPrismaMapper.toDomain(rawStudentData);
  }

  async findById(id: string): Promise<Student | null> {
    const rawStudentData = await this.prismaService.student.findUnique({ where: { id } });
    
    if (!rawStudentData) {
      return null;
    }

    return StudentPrismaMapper.toDomain(rawStudentData);
  }

  async findByCpf(cpf: string): Promise<Student | null> {
    const rawStudentData = await this.prismaService.student.findFirst({ where: { cpf } });

    if (!rawStudentData) {
      return null;
    }

    return StudentPrismaMapper.toDomain(rawStudentData);
  }

  async findByEmail(email: string): Promise<Student | null> {
    const rawStudentData = await this.prismaService.student.findFirst({ where: { email } });

    if (!rawStudentData) {
      return null;
    }

    return StudentPrismaMapper.toDomain(rawStudentData);
  }

  async findByRa(ra: number): Promise<Student | null> {
    const rawStudentData = await this.prismaService.student.findUnique({ where: { ra } });

    if (!rawStudentData) {
      return null;
    }

    return StudentPrismaMapper.toDomain(rawStudentData);
  }

  async find(params: FindStudentsRequestDto): Promise<PaginatedFindStudentsResponse> {
    const { page = 1, limit = 10, orderBy = 'name', order = 'asc', query } = params;

    const skip = (page - 1) * limit;
    const where = query
      ? {
          OR: [
            { name: { contains: query, mode: Prisma.QueryMode.insensitive } },
            { email: { contains: query, mode: Prisma.QueryMode.insensitive } },
            { cpf: { contains: query, mode: Prisma.QueryMode.insensitive } },
            ...(isNaN(Number(query)) ? [] : [{ ra: Number(query) }]),
          ],
        }
      : {};

    const totalItems = await this.prismaService.student.count({ where });

    const students = await this.prismaService.student.findMany({
      where,
      orderBy: { [orderBy]: order },
      skip,
      take: limit,
    });

    const data = students.map(StudentPrismaMapper.toDomain);

    return {
      data,
      total: totalItems,
      page,
      limit,
    };
  }

  async update(id: string, data: UpdateStudentDTO): Promise<Student> {
    const rawStudentData = await this.prismaService.student.update({ where: { id }, data });

    return StudentPrismaMapper.toDomain(rawStudentData);
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.student.delete({ where: { id } });
  }
}