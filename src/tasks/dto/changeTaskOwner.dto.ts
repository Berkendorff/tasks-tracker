import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ChangeTaskOwnerDto{

    @ApiProperty({
        description: 'Real id of user',
        type: Number,
    })
    @IsNotEmpty()
    // @IsNumber()
    newOwnerId: number;

    @ApiProperty({
        description: 'Real id of task of current user',
        type: Number,
    })
    @IsNotEmpty()
    // @IsNumber()
    taskId: number;
}