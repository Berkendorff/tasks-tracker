import { IsOptional, IsEmail, IsString, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpCredentialsDto{

    @ApiProperty({
        description: 'Required',
        maxLength: 32,
        minLength:1
    })
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(32)
    first_name: string;

    @ApiProperty({
        description: 'Required',
        maxLength: 32,
        minLength:1
    })
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(32)
    second_name: string;

    @ApiProperty({
        description: 'Required, Email',
        maxLength: 64,
    })
    @IsEmail()
    @MaxLength(64)
    email: string;
    
    @ApiProperty({
        description: 'Required',
        maxLength: 64,
        minLength: 4
    })
    @IsString()
    @MinLength(4)
    @MaxLength(64)
    password: string;
}