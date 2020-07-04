import { TaskStatus } from "../taskStatus.enum";
import { IsIn, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class TasksFilterDto{
   
    @ApiProperty({
        description: 'Optional',
        enum: ['VIEW', 'DONE', 'IN PROGRESS']
    
    })
    @IsOptional()
    @IsIn([TaskStatus.VIEW, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;

    @ApiProperty({
        description: 'Optional',
        type: Boolean
    })
    @IsOptional()
    isSortByNewUsers: boolean;
}