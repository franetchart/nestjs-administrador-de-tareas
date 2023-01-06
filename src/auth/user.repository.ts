import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCrecencialesDto } from './dto/auth.credenciales.dto';

@EntityRepository()
export class UserRepository extends Repository<User> {
  async registro(authCredencialesDto: AuthCrecencialesDto): Promise<void> {
    const { username, password } = authCredencialesDto;
    const user = new User();
    user.username = username;
    user.password = password;

    await user.save();
  }
}
