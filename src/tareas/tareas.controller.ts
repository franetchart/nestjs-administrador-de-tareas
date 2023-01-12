import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TareasService } from './tareas.service';
import { CrearTareaDto } from './dto/crear-tarea.dto';
import { tareaEstadosValidationPipe } from './pipes/tarea-estados-validation.pipe';
import { Tarea } from './tarea.entity';
import { EstadoDeTarea } from './tarea-estado.enum';
import { getFiltrosDeTareas } from './dto/get-filtros-tareas.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tareas')
@UseGuards(AuthGuard())
export class TareasController {
  constructor(private tareasService: TareasService) {}

  @Get()
  getTareas(
    @Query(ValidationPipe) filtroDto: getFiltrosDeTareas,
    @GetUser() user: User,
  ): Promise<Tarea[]> {
    return this.tareasService.getTask(filtroDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Tarea> {
    return this.tareasService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  crearTask(
    @Body() CrearTareaDto: CrearTareaDto,
    @GetUser() user: User,
  ): Promise<Tarea> {
    return this.tareasService.crearTask(CrearTareaDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tareasService.deleteTask(id);
  }

  @Patch('/:id/estado')
  actualizarTaskEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body('estado', tareaEstadosValidationPipe) estado: EstadoDeTarea,
  ): Promise<Tarea> {
    return this.tareasService.actualizarTaskEstado(id, estado);
  }
}
