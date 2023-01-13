//import { EstadoDeTarea, Tarea } from './tareas.model';
// import { v4 as uuidv4 } from 'uuid';
//import { EstadoDeTarea } from './tarea-estado.enum';
//import { getFiltrosDeTareas } from './dto/get-filtros-tareas.dto';
import { CrearTareaDto } from './dto/crear-tarea.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TareaRepository } from './tarea.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarea } from './tarea.entity';
import { EstadoDeTarea } from './tarea-estado.enum';
import { getFiltrosDeTareas } from './dto/get-filtros-tareas.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(TareaRepository)
    private tareaRepository: TareaRepository,
  ) {}

  async getTask(filtroDto: getFiltrosDeTareas, user: User): Promise<Tarea[]> {
    return this.tareaRepository.getTask(filtroDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Tarea> {
    const found = await this.tareaRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException(`Tarea por ID '${id}' no encontrada`);
    }
    return found;
  }

  async crearTask(crearTareaDto: CrearTareaDto, user: User): Promise<Tarea> {
    return this.tareaRepository.crearTask(crearTareaDto, user);
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.tareaRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Tarea por ID '${id}' no encontrada`);
    }
  }
  async actualizarTaskEstado(
    id: number,
    estado: EstadoDeTarea,
    user: User,
  ): Promise<Tarea> {
    const tarea = await this.getTaskById(id, user);
    tarea.estado = estado;
    await tarea.save();
    return tarea;
  }
}
