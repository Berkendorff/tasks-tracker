import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../users/user.repository';
import { SignUpCredentialsDto } from './dto/signUpCredentials.dto';
import { SignInCredentialsDto } from './dto/signInCredentials.dto';

import { JwtPayload } from './jwtPayload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ){}

    async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
        return await this.userRepository.signUp(signUpCredentialsDto);
    }

    async signIn(signInCredentialsDto: SignInCredentialsDto): Promise<{ accessToken: string }>{
        const payload: JwtPayload = await this.userRepository.validateUserPassword(signInCredentialsDto);
        
        if(!payload.email) throw new UnauthorizedException('Invalid email or password');
        const accessToken = this.jwtService.sign(payload);
        
        return { accessToken };
    }

}
