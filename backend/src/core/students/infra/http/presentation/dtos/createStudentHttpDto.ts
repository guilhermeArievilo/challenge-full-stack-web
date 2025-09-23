import { IsEmail, IsNotEmpty, IsPositive } from "class-validator";

export default class CreateStudentHttpDto {
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  cpf: string;
  
  @IsNotEmpty()
  @IsPositive()
  ra: number;
}