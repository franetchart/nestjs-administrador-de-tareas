import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { EstadoDeTarea } from '../tareas.model';

export class getFiltrosDeTareas {
  @IsOptional()
  @IsIn([
    EstadoDeTarea.ABIERTO,
    EstadoDeTarea.EN_PROGRESO,
    EstadoDeTarea.COMPLETADO,
  ])
  estado: EstadoDeTarea;
  @IsOptional()
  @IsNotEmpty()
  buscar: string;
}
