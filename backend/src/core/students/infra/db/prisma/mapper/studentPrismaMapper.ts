import Student from "@/core/students/domain/entity/student";
import { Student as RawStudent } from "@prisma/client";

export default class StudentPrismaMapper {
  static toPrisma(student: Student): RawStudent {
    return {
      id: student.id!,
      name: student.name,
      cpf: student.cpf,
      ra: student.ra,
      email: student.email,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    };
  }

  static toDomain(raw: RawStudent): Student {
    return new Student({
      name: raw.name,
      cpf: raw.cpf,
      ra: raw.ra,
      email: raw.email,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }, raw.id);
  }
}