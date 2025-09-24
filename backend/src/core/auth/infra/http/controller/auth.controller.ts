import LoginUseCase from "@/core/auth/domain/application/use-cases/loginUseCase";
import LogoutUseCase from "@/core/auth/domain/application/use-cases/logoutUseCase";
import RefreshUseCase from "@/core/auth/domain/application/use-cases/refreshUseCase";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import LoginHttpRequestDTO from "../presentation/dtos/loginHttpRequestDTO";
import RefreshHttpRequestDTO from "../presentation/dtos/refreshHttpRequestDTO";
import LogoutHttpRequestDTO from "../presentation/dtos/logoutHttpRequestDTO";

@Controller('auth')
export class AuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private refreshUseCase: RefreshUseCase,
    private logoutUseCase: LogoutUseCase
  ) {}

  @Post('login')
  async login(@Body() loginData: LoginHttpRequestDTO) {
    const { identifier, password } = loginData;

    try {
      const tokens = await this.loginUseCase.execute({
        identifier,
        password
      });

      return tokens;
    } catch (error) {
      throw error;
    }
  }

  @HttpCode(200)
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshTokenDto: RefreshHttpRequestDTO) {
    const { refreshToken } = refreshTokenDto;

    try {
      const tokens = await this.refreshUseCase.execute(refreshToken);

      return tokens;
    } catch (error) {
      throw error;
    }
  }

  @HttpCode(200)
  @Post('logout')
  async logout(@Body('refreshToken') refreshTokenDto: LogoutHttpRequestDTO) {
    const { refreshToken } = refreshTokenDto;

    try {
      await this.logoutUseCase.execute(refreshToken);
    } catch (error) {
      throw error;
    }
  }
}