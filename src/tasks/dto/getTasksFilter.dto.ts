import { TaskStatus } from "../taskStatus.enum";
import { IsIn, IsOptional } from "class-validator";

export class TasksFilterDto{
   
    @IsOptional()
    @IsIn([TaskStatus.VIEW, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;

    @IsOptional()
    isSortByNewUsers: boolean;
}