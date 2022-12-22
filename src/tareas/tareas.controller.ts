import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TareasService } from './tareas.service';
import { EstadoDeTarea, Tarea } from './tareas.model';
import { CrearTareaDto } from './dto/crear-tarea.dto';
import { getFiltrosDeTareas } from './dto/get-filtros-tareas.dto';

@Controller('tareas')
export class TareasController {
  constructor(private tareasService: TareasService) {}

  @Get()
  getTareas(@Query() filtroDto: getFiltrosDeTareas): Tarea[] {
    if (Object.keys(filtroDto).length) {
      return this.tareasService.getTareasConFiltro(filtroDto);
    } else {
      return this.tareasService.getVariasTareas();
    }
  }

  @Get('/:id')
  getTareaPorId(@Param('id') id: string): Tarea {
    return this.tareasService.getTareaPorId(id);
  }

  @Post()
  CrearTarea(@Body() CrearTareaDto: CrearTareaDto): Tarea {
    return this.tareasService.crearTarea(CrearTareaDto);
  }

  @Delete('/:id')
  eliminarTarea(@Param('id') id: string): void {
    this.tareasService.eliminarTarea(id);
  }

  @Patch('/:id/estado')
  actualizarEstadoTarea(
    @Param('id') id: string,
    @Body('estado') estado: EstadoDeTarea,
  ): Tarea {
    return this.tareasService.actualizarEstadoTarea(id, estado);
  }
}
