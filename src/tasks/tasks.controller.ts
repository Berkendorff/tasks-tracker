import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Delete, 
    Param, 
    Patch, 
    Query, 
    ValidationPipe, 
    UsePipes, 
    ParseIntPipe,
    UseGuards,
    Req,
    Put
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus} from './taskStatus.enum';
import { CreateTaskDto } from './dto/createTask.dto';
import { TasksFilterDto } from './dto/getTasksFilter.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { TaskStatusValidationPipe } from './pipes/taskStatus.validation';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/getUser.decorator';
import { User } from 'src/users/user.entity';
import { ChangeTaskOwnerDto } from './dto/changeTaskOwner.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @ApiBody({
        description: 'Get tasks by auth user with filter in query',
        type: TasksFilterDto
    })
    @Get()
    @UsePipes(ValidationPipe)
    async getTasks(@Query() filterDto: TasksFilterDto) : Promise<Task[]> {
        return await this.tasksService.getTasks(filterDto);
    }

    @ApiBody({
        description: 'Get task by id by auth user with filter in query',
        type: Number
    })
    @Get('/:id')
    async getTaskById(@Param('id', ParseIntPipe) taskId: number): Promise<Task>{
        return await this.tasksService.getTaskById(taskId);
    }

    @ApiBody({
        description: 'Create task by auth user',
        type: CreateTaskDto
    })
    @Post()
    @UsePipes(ValidationPipe)
    async createTask(
        @Req() req,
        @Body() createTaskDto: CreateTaskDto,
        ): Promise<Task>{
        const user: User = req.user;
        return await this.tasksService.createTask(createTaskDto, user);
    }

    @ApiBody({
        description:'Change owner of task if user is main owner',
        type: ChangeTaskOwnerDto
    })
    @Put('/change_owner')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async changeOwner(@Req() req, @Body() changeTaskOwnerDto: ChangeTaskOwnerDto ): Promise<{statusCode: string}>{
        const user: User = req.user;
        return await this.tasksService.changeTaskOwner(user, changeTaskOwnerDto);
    }


    @ApiBody({
        description: 'Update task info query?id=taskId and update task?)',
        type: UpdateTaskDto
    })
    @Patch('/:id')
    @UsePipes(ValidationPipe)
    async updateTask(@Param('id', ParseIntPipe) taskId: number,@Body() updateTask: UpdateTaskDto): Promise<Task>{
        return await this.tasksService.updateTask(taskId, updateTask);
    }

    @ApiBody({
        description: 'Update task status',
        type: Number
    })
    @Patch(':id/status')
    @UsePipes(ValidationPipe)
    async updateTaskStatus(@Param('id') taskId: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task>{
        return await this.tasksService.updateTaskStatus(taskId,status);
    }

    @ApiBody({
        description: 'Delete task',
        type: Number
    })
    @Delete('/:id')
    async deleteTask(@Param('id') taskId: number, @Req() req): Promise<{statusCode: string}> {
        const user: User = req.user;
        return await this.tasksService.deleteTask(user, taskId);
    }
}
