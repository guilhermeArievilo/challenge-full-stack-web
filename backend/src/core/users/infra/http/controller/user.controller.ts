import CreateUserUseCase from "@/core/users/domain/application/use-cases/createUserUseCase";
import FindUserByEmailUseCase from "@/core/users/domain/application/use-cases/findUserByEmailUseCase";
import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from "@nestjs/common";
import UserViewModel from "../presentation/view-models/userViewModel";
import ResourceNotFoundError from "@/shared/exceptions/resourceNotFoundError";
import RequiredFieldError from "@/shared/exceptions/requiredFieldError";
import CreateUserBodyDTO from "../presentation/dto/CreateUserBodyDTO";
import { ResourceAlreadyExistError } from "@/shared/exceptions/resourceAlreadyExistError";
import { JwtAuthGuard } from "@/shared/infra/jwt/jwt-auth.guard";

@Controller('user')
export class UserController {
  constructor(
    private findUserByEmailUseCase: FindUserByEmailUseCase,
    private createUserUseCase: CreateUserUseCase
  ) {}

  @Post('/register')
  async createUser(@Body() userData: CreateUserBodyDTO) {
    const { name, email, password } = userData;
    try {
      const user = await this.createUserUseCase.execute({
        name,
        email,
        password
      });

      return UserViewModel.toHttp(user);
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
  @Get('/:email')
  async getUserByEmail(@Param('email') email: string) {
    try {
      const user = await this.findUserByEmailUseCase.execute(email);
      return UserViewModel.toHttp(user);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw new NotFoundException(error.message);
      }

      if (error instanceof RequiredFieldError) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }
  }
}