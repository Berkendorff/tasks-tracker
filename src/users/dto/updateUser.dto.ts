import { IsOptional, IsString, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto{

    @ApiProperty({
        description: 'Optional',
        maxLength: 32,
        minLength:1
    })
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(32)
    first_name: string;

    @ApiProperty({
        description: 'Optional',
        maxLength: 32,
        minLength:1
    })
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(32)
    second_name: string;
}