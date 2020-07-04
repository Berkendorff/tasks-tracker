import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwtPayload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../users/user.repository';
import { User } from '../users/user.entity';

import * as dotenv from 'dotenv';
dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: JwtPayload): Promise<User>{
        const user = await this.userRepository.findOne({email: payload.email});

        if(!user){throw new UnauthorizedException();}
        return user;
    }
}