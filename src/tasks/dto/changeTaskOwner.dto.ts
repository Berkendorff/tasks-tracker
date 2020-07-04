import { IsNotEmpty, IsNumber } from "class-validator";

export class ChangeTaskOwnerDto{

    @IsNotEmpty()
    // @IsNumber()
    newOwnerId: number;

    @IsNotEmpty()
    // @IsNumber()
    taskId: number;
}