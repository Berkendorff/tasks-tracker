import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './taskStatus.enum';
import { CreateTaskDto } from './dto/createTask.dto';
import { TasksFilterDto } from './dto/getTasksFilter.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
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

    async deleteTask(taskId: number):Promise<{ message: string }>{
        return this.taskRepository.deleteTask(taskId);
    }
 
}