import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EstadoDeTarea } from './tareas.model';

@Entity()
export class tarea extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;
  @Column()
  descripcion: string;
  @Column()
  estado: EstadoDeTarea;
}
