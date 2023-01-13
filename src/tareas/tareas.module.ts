import { Module } from '@nestjs/common';
import { TareasController } from './tareas.controller';
import { TareasService } from './tareas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TareaRepository } from './tarea.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TareaRepository]), AuthModule],
  controllers: [TareasController],
  providers: [TareasService],
})
export class TareasModule {}
