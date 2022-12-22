import { Module } from '@nestjs/common';
import { TareasModule } from './tareas/tareas.module';
import { TareasService } from './tareas/tareas.service';

@Module({
  imports: [TareasModule],
  providers: [TareasService],
})
export class AppModule {}
