import { Body, Controller, Post } from '@nestjs/common';
import { AuthCrecencialesDto } from './dto/auth.credenciales.dto';

@Controller('auth')
export class AuthController {
  @Post('/registro')
  registro(@Body() authCredencialesDto: AuthCrecencialesDto) {}
}
