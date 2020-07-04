import { IsEmail, IsString, MaxLength, MinLength, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignInCredentialsDto{
    
    @ApiProperty({
        description: 'Required, Email',
        maxLength: 64
    })
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(64)
    email: string;

    @ApiProperty({
        description: 'Required',
        maxLength: 64,
        minLength:4
    })
    @IsString()
    @MinLength(4)
    @MaxLength(64)
    password: string;
}