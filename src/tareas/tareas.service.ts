import { Injectable } from '@nestjs/common';
import { EstadoDeTarea, Tarea } from './tareas.model';
import { v4 as uuidv4 } from 'uuid';
import { CrearTareaDto } from './dto/crear-tarea.dto';
import { getFiltrosDeTareas } from './dto/get-filtros-tareas.dto';
@Injectable()
export class TareasService {
  private tareas: Tarea[] = [];

  getVariasTareas(): Tarea[] {
    return this.tareas;
  }

  getTareasConFiltro(filtroDto: getFiltrosDeTareas): Tarea[] {
    const { estado, buscar } = filtroDto;

    let tareas = this.getVariasTareas();

    if (estado) {
      tareas = tareas.filter((tarea) => tarea.estado === estado);
    }

    if (buscar) {
      tareas = tareas.filter(
        (tarea) =>
          tarea.titulo.includes(buscar) || tarea.descripcion.includes(buscar),
      );
    }

    return tareas;
  }

  getTareaPorId(id: string): Tarea {
    return this.tareas.find((tareas) => tareas.id === id);
  }

  crearTarea(crearTareaDto: CrearTareaDto): Tarea {
    const { titulo, descripcion } = crearTareaDto;

    const tarea: Tarea = {
      id: uuidv4(),
      titulo,
      descripcion,
      estado: EstadoDeTarea.ABIERTO,
    };

    this.tareas.push(tarea);
    return tarea;
  }

  eliminarTarea(id: string): void {
    this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
  }

  actualizarEstadoTarea(id: string, estado: EstadoDeTarea): Tarea {
    const tarea = this.getTareaPorId(id);
    tarea.estado = estado;
    return tarea;
  }
}
