import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EstadoDeTarea } from './tarea-estado.enum';
import { User } from 'src/auth/user.entity';
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
  @ManyToOne((type) => User, (user) => user.tareas, { eager: false })
  user: User;
}
