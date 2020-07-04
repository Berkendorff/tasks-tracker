import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class SignInCredentialsDto{
    
    @IsEmail()
    @MaxLength(64)
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(64)
    password: string;
}