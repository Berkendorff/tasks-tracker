import { TaskStatus } from "../taskStatus.enum";
import { IsOptional, IsIn, IsNotEmpty, IsUppercase } from "class-validator";

export class UpdateTaskDto{
    
    @IsOptional()
    @IsUppercase()
    @IsIn([TaskStatus.VIEW, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsNotEmpty()
    title: string;
}