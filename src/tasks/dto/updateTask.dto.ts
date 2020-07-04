import { TaskStatus } from "../taskStatus.enum";
import { IsOptional, IsIn, IsNotEmpty, IsUppercase } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTaskDto{
    
    @ApiProperty({
        description: 'Optional, should be VIEW, IN PROGRESS or DONE'
    })
    @IsOptional()
    @IsUppercase()
    @IsIn([TaskStatus.VIEW, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;

    @ApiProperty({
        description: 'Optional'
    })
    @IsOptional()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'Optional'
    })
    @IsOptional()
    @IsNotEmpty()
    title: string;
}