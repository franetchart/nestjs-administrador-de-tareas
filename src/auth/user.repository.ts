import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCrecencialesDto } from './dto/auth.credenciales.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';

@EntityRepository()
export class UserRepository extends Repository<User> {
  async registro(authCredencialesDto: AuthCrecencialesDto): Promise<void> {
    const { username, password } = authCredencialesDto;

    const salt = await bcrypt.genSalt();

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    //TODO: COMPRUEBA SI USUARIO EXISTE
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Este usuario ya existe');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async valudateUserPassword(
    authCredencialesDto: AuthCrecencialesDto,
  ): Promise<string> {
    const { username, password } = authCredencialesDto;
    const user = await this.findOneBy({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt(password, salt);
  }
}
