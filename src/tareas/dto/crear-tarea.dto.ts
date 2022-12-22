import { IsNotEmpty } from 'class-validator';

export class CrearTareaDto {
  @IsNotEmpty()
  titulo: string;

  @IsNotEmpty()
  descripcion: string;
}
