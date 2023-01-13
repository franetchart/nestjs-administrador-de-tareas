import { Module } from '@nestjs/common';
import { TareasModule } from './tareas/tareas.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TareasModule, TypeOrmModule.forRoot(typeOrmConfig), AuthModule],
  providers: [],
})
export class AppModule {}
