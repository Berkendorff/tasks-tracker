/* eslint-disable @typescript-eslint/camelcase */
import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { SignUpCredentialsDto } from '../auth/dto/signUpCredentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignInCredentialsDto } from '../auth/dto/signInCredentials.dto';
import { JwtPayload } from '../auth/jwtPayload.interface';

const emailAlreadyExists = '23505'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(signUpCredentialsDto: SignUpCredentialsDto){
        const { 
            first_name, 
            second_name,
            email, 
            password 
        } = signUpCredentialsDto;

        const user = new User();
        first_name? user.first_name = first_name: {};
        second_name? user.second_name = second_name: {};
        user.date_creation = new Date();
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        

        try{
            await user.save();
        }
        catch(err){
            if(err.code===emailAlreadyExists) 
            throw new ConflictException('Email already exists');
            throw new InternalServerErrorException();
        } 
    }

    private async hashPassword( password: string, salt: string): Promise<string>{
        return await bcrypt.hash(password, salt);
    }

    async validateUserPassword(signInCredentialsDto: SignInCredentialsDto):Promise<JwtPayload>{
        const {email, password} = signInCredentialsDto;
        const user = await this.findOne({email});
        if(user && user.validatePassword(password)){ 
            const payload: JwtPayload = {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                second_name: user.second_name
            }
            return payload;
        }

        return null;
    }

    
}