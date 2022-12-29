import { Module } from '@nestjs/common';
import { TareasModule } from './tareas/tareas.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [TareasModule, TypeOrmModule.forRoot(typeOrmConfig)],
  providers: [],
})
export class AppModule {}
