import { PipeTransform } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { EstadoDeTarea } from '../tarea-estado.enum';

export class tareaEstadosValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    EstadoDeTarea.ABIERTO,
    EstadoDeTarea.EN_PROGRESO,
    EstadoDeTarea.COMPLETADO,
  ];
  transform(value: any) {
    value = value.toUpperCase();

    if (!this.elEstadoEsValido(value)) {
      throw new BadRequestException(`'${value}' es un estado no valido `);
    }

    return value;
  }
  private elEstadoEsValido(estado: any) {
    const idx = this.allowedStatuses.indexOf(estado);

    return idx !== -1;
  }
}
