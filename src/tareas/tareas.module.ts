import { Module } from '@nestjs/common';
import { TareasController } from './tareas.controller';
import { TareasService } from './tareas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TareaRepository } from './tarea.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TareaRepository])],
  controllers: [TareasController],
  providers: [TareasService],
})
export class TareasModule {}
