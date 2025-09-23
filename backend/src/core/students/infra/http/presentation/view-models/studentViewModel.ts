import Student from "@/core/students/domain/entity/student";

export default class StudentViewModel {
  static toHttp(data: Student) {
    const { name, email, cpf, ra } = data.toJSON();
    return {
      id: data.id,
      name,
      email,
      cpf,
      ra
    }
  }
}