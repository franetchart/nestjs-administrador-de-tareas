import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EstadoDeTarea } from './tarea-estado.enum';
@Entity()
export class Tarea extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;
  @Column()
  descripcion: string;
  @Column()
  estado: EstadoDeTarea;
}
