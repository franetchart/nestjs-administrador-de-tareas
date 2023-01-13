import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  username: '',
  password: '',
  entities: [__dirname + '/../**/*.entity.ts'],
  synchronize: true,
};
