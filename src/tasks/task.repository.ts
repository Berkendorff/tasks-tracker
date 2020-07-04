import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/createTask.dto";
import { TaskStatus } from "./taskStatus.enum";
import { NotFoundException, BadRequestException } from "@nestjs/common";
import { TasksFilterDto } from "./dto/getTasksFilter.dto";
import { UpdateTaskDto } from "./dto/updateTask.dto";
import { User } from "src/users/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const {title, description} = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.VIEW;
        task.user = user;
        await task.save();
        delete task.user;

        return task;
    }

    async getTasks(filterDto: TasksFilterDto): Promise<Task[]> {
        const {status, isSortByNewUsers} = filterDto;
        const query = this.createQueryBuilder('task');
        
        if(status){
            query.andWhere('task.status= :status',{status: status});
        }

        if(isSortByNewUsers){
            query.leftJoin("task.user", "user")
            .addOrderBy('user.date_creation', 'DESC')
        } else {
            query.leftJoin("task.user", "user")
            .addOrderBy('user.date_creation', 'ASC')
        }

        const tasks = await query.getMany();
        return tasks;
    }

    async updateTask(taskId: number, updateTask: UpdateTaskDto): Promise<Task>{
        const { title, status, description } = updateTask;
        if(!title&&!status&&!description) throw new BadRequestException('Body params is Empty');
        
        const task = await this.findOne({id: taskId});
        if(!task) throw new BadRequestException('Task with this ID not exists');

        if(title) task.title = title;
        if(status) task.status = status;
        if(description) task.description = description; 

        await task.save();
        return task;
    }

    async deleteTask(taskId: number): Promise<{message:string}> {
        const task = await this.findOne({id: taskId});
        if(!task) throw new  NotFoundException(`Task with this ID not found`);
        task.remove();
        return { message: '202' };
    }

    
}