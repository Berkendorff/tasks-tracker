import { IsOptional, IsEmail, IsString, MinLength, MaxLength } from "class-validator";

export class SignUpCredentialsDto{

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

    @IsEmail()
    @MaxLength(64)
    email: string;
    
    @IsString()
    @MinLength(4)
    @MaxLength(64)
    password: string;
}