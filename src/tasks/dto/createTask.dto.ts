import {IsNotEmpty, IsOptional} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto{

    @ApiProperty({
        description: 'title of task',
        type: String,
        nullable: false
    })
    @IsNotEmpty()
    title:string;
    
    @ApiProperty({
        description: 'Optional description of task',
        type: String
    })
    @IsOptional()
    @IsNotEmpty()
    description:string;
}