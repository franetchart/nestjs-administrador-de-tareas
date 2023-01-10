import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCrecencialesDto } from './dto/auth.credenciales.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/registro')
  registro(
    @Body(ValidationPipe) authCredencialesDto: AuthCrecencialesDto,
  ): Promise<void> {
    return this.authService.registro(authCredencialesDto);
  }

  @Post('/ingreso')
  ingreso(
    @Body(ValidationPipe) authCredencialesDto: AuthCrecencialesDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.ingreso(authCredencialesDto);
  }
}
