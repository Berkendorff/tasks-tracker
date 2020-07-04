import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TaskStatus } from './taskStatus.enum';
import { CreateTaskDto } from './dto/createTask.dto';
import { TasksFilterDto } from './dto/getTasksFilter.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/users/user.entity';
import { ChangeTaskOwnerDto } from './dto/changeTaskOwner.dto';
import { UserRepository } from 'src/users/user.repository';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
        private userRepository: UserRepository,
        ){}

    async getTasks(filterDto: TasksFilterDto): Promise<Task[]> {
        return await this.taskRepository.getTasks(filterDto);
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>{
       return await this.taskRepository.createTask(createTaskDto, user);
    }

    async getTaskById(taskId:number): Promise<Task>{
        const task = await this.taskRepository.findOne({id: taskId})

        if(!task) throw new NotFoundException(`Task with this ID not found`);
        return task;
    }

    async updateTaskStatus(taskId: number, status: TaskStatus): Promise<Task>{
        const task = await this.getTaskById(taskId);
        task.status = status;
        task.save();
        return task;
    }

    async updateTask(taskId: number, updateTask: UpdateTaskDto): Promise<Task>{
        return await this.taskRepository.updateTask(taskId, updateTask);
    }

    async changeTaskOwner(user: User, changeTaskOwnerDto: ChangeTaskOwnerDto): Promise<{statusCode: string}>{
        let {taskId, newOwnerId} = changeTaskOwnerDto;
        taskId = Number(taskId);
        newOwnerId = Number(newOwnerId);
        if(!taskId||!newOwnerId) throw new BadRequestException('TaskId & New Owner Id must be numbers')
        if(newOwnerId===user.id) throw new BadRequestException('You are owner of this task');

        const task: Task = user.tasks.find(task=>task.id===taskId);
        if(!task) throw new BadRequestException('You are not owner of this task');

        const newOwner = await this.userRepository.findOne({id: newOwnerId});
        if(!newOwner) throw new BadRequestException('This user not exists');
       
        task.user = newOwner;
        await task.save()
        return { statusCode: "204"};
    }

    async deleteTask(user: User, taskId: number):Promise<{ statusCode: string }>{
        const task = await user.tasks.find(task=>task.id===taskId);
        if(!task) throw new BadRequestException('You are not owner of this task!');
        await task.remove()
        return {statusCode: '204'};
    }
 
}