import { EntityRepository, Repository } from 'typeorm';
import { Tarea } from './tarea.entity';
import { CrearTareaDto } from './dto/crear-tarea.dto';
import { EstadoDeTarea } from './tarea-estado.enum';
import { getFiltrosDeTareas } from './dto/get-filtros-tareas.dto';

@EntityRepository(Tarea)
export class TareaRepository extends Repository<Tarea> {
  async getTask(filtroDto: getFiltrosDeTareas): Promise<Tarea[]> {
    const { estado, buscar } = filtroDto;
    const query = this.createQueryBuilder('tarea');

    if (estado) {
      query.andWhere('tarea.estado = :estado', { estado });
    }

    if (buscar) {
      query.andWhere(
        '(tarea.titulo LIKE :buscar OR tarea.descripcion LIKE :buscar)',
        { buscar: `%${buscar}%` },
      );
    }
    const tareas = await query.getMany();
    return tareas;
  }

  async crearTask(crearTareaDto: CrearTareaDto): Promise<Tarea> {
    const { titulo, descripcion } = crearTareaDto;
    const tarea = new Tarea();
    tarea.titulo = titulo;
    tarea.descripcion = descripcion;
    tarea.estado = EstadoDeTarea.ABIERTO;
    await tarea.save();
    return tarea;
  }
}
