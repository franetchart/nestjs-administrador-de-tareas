import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCrecencialesDto } from './dto/auth.credenciales.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload-interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async registro(authCredencialesDto: AuthCrecencialesDto): Promise<void> {
    return this.userRepository.registro(authCredencialesDto);
  }

  async ingreso(
    authCredencialesDto: AuthCrecencialesDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validatePassword(
      authCredencialesDto,
    );

    if (!username) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
