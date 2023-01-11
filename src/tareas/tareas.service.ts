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

  async getTask(filtroDto: getFiltrosDeTareas): Promise<Tarea[]> {
    return this.tareaRepository.getTask(filtroDto);
  }

  async getTaskById(id: number): Promise<Tarea> {
    const found = await this.tareaRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Tarea por ID '${id}' no encontrada`);
    }
    return found;
  }

  async crearTask(crearTareaDto: CrearTareaDto, user: User): Promise<Tarea> {
    return this.tareaRepository.crearTask(crearTareaDto, user);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.tareaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tarea por ID '${id}' no encontrada`);
    }
  }
  async actualizarTaskEstado(
    id: number,
    estado: EstadoDeTarea,
  ): Promise<Tarea> {
    const tarea = await this.getTaskById(id);
    tarea.estado = estado;
    await tarea.save();
    return tarea;
  }

  // private tareas: Tarea[] = [];
  // getVariasTareas(): Tarea[] {
  //   return this.tareas;
  // }
  // getTareasConFiltro(filtroDto: getFiltrosDeTareas): Tarea[] {
  //   const { estado, buscar } = filtroDto;
  //   let tareas = this.getVariasTareas();
  //   if (estado) {
  //     tareas = tareas.filter((tarea) => tarea.estado === estado);
  //   }
  //   if (buscar) {
  //     tareas = tareas.filter(
  //       (tarea) =>
  //         tarea.titulo.includes(buscar) || tarea.descripcion.includes(buscar),
  //     );
  //   }
  //   return tareas;
  // }
  // getTareaPorId(id: string): Tarea {
  //   const found = this.tareas.find((tareas) => tareas.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Tarea por ID '${id}' no encontrada`);
  //   }
  //   return found;
  // }
  // crearTarea(crearTareaDto: CrearTareaDto): Tarea {
  //   const { titulo, descripcion } = crearTareaDto;
  //   const tarea: Tarea = {
  //     id: uuidv4(),
  //     titulo,
  //     descripcion,
  //     estado: EstadoDeTarea.ABIERTO,
  //   };
  //   this.tareas.push(tarea);
  //   return tarea;
  // }
  // eliminarTarea(id: string): void {
  //   const found = this.getTareaPorId(id);
  //   this.tareas = this.tareas.filter((tarea) => tarea.id !== found.id);
  // }
  // actualizarEstadoTarea(id: string, estado: EstadoDeTarea): Tarea {
  //   const tarea = this.getTareaPorId(id);
  //   tarea.estado = estado;
  //   return tarea;
  // }
}
