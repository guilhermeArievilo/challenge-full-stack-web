import CreateStudentUseCase from "@/core/students/domain/application/use-cases/createStudentUseCase";
import DeleteStudentUseCase from "@/core/students/domain/application/use-cases/deleteStudentUseCase";
import FindStudentByIdUseCase from "@/core/students/domain/application/use-cases/findStudentByIdUseCase";
import FindStudentsUseCase from "@/core/students/domain/application/use-cases/findStudentsUseCase";
import UpdateStudentUseCase from "@/core/students/domain/application/use-cases/updateStudentUseCase";
import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import CreateStudentHttpDto from "../presentation/dtos/createStudentHttpDto";
import StudentViewModel from "../presentation/view-models/studentViewModel";
import RequiredFieldError from "@/shared/exceptions/requiredFieldError";
import { ResourceAlreadyExistError } from "@/shared/exceptions/resourceAlreadyExistError";
import ResourceNotFoundError from "@/shared/exceptions/resourceNotFoundError";
import { StudentProps } from "@/core/students/domain/entity/student";
import UpdateStudentHttpDto from "../presentation/dtos/updateStudentHttpDto";
import { JwtAuthGuard } from "@/shared/infra/jwt/jwt-auth.guard";

@Controller('students')
export class StudentController {
  constructor(
    private createStudentUseCase: CreateStudentUseCase,
    private findStudentByIdUseCase: FindStudentByIdUseCase,
    private findStudentsUseCase: FindStudentsUseCase,
    private updateStudentUseCase: UpdateStudentUseCase,
    private deleteStudentUseCase: DeleteStudentUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createStudent(@Body() studentData: CreateStudentHttpDto) {
    const { name, email, cpf, ra } = studentData;

    try {
      const student = await this.createStudentUseCase.execute({
        name,
        email,
        cpf,
        ra
      });

      return StudentViewModel.toHttp(student);
    } catch (error) {
      if (error instanceof RequiredFieldError) {
        throw new BadRequestException(error.message);
      }

      if (error instanceof ResourceAlreadyExistError) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getStudentById(@Param('id') id: string) {
    try {
      const student = await this.findStudentByIdUseCase.execute(id);
      return StudentViewModel.toHttp(student);
    } catch (error) {
      if (error instanceof RequiredFieldError) {
        throw new BadRequestException(error.message);
      }

      if (error instanceof ResourceNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getStudents(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('orderBy') orderBy?: keyof StudentProps,
    @Query('order') order?: 'asc' | 'desc',
    @Query('query') query?: string,
  ) {
    try {
      const students = await this.findStudentsUseCase.execute({
        page: Number(page),
        limit: Number(limit),
        orderBy,
        order,
        query
      });

      return {
        data: students.data.map(StudentViewModel.toHttp),
        total: students.total,
        page: students.page,
        limit: students.limit,
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateStudent(
    @Param('id') id: string,
    @Body() studentData: UpdateStudentHttpDto
  ) {
    const { name, email } = studentData;

    try {
      const student = await this.updateStudentUseCase.execute(id, {
        name,
        email
      });

      return StudentViewModel.toHttp(student);
    } catch (error) {      
      if (error instanceof RequiredFieldError) {
        throw new BadRequestException(error.message);
      }

      if (error instanceof ResourceAlreadyExistError) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteStudent(@Param('id') id: string) {
    try {
      await this.deleteStudentUseCase.execute(id);
    } catch (error) {      
      if (error instanceof RequiredFieldError) {
        throw new BadRequestException(error.message);
      }

      if (error instanceof ResourceNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }
}