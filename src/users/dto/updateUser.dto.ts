import { IsOptional, IsString, MinLength, MaxLength } from "class-validator";

export class UpdateUserDto{
    
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(32)
    first_name: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(32)
    second_name: string;
}