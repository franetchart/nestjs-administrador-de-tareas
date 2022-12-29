import { EntityRepository, Repository } from 'typeorm';
import { tarea } from './tarea.entity';

@EntityRepository(tarea)
export class TareaRepository extends Repository<tarea> {}
