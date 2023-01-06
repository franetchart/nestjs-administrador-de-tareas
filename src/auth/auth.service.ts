import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCrecencialesDto } from './dto/auth.credenciales.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async registro(authCredencialesDto: AuthCrecencialesDto): Promise<void> {
    return this.userRepository.registro(authCredencialesDto);
  }
}
