/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){}

    async getUsers(page: number): Promise<User[]>{
        const limit = 10;
        const skip = page * 10;
        const users: User[] = await this.userRepository.find({
            skip,
            take: limit,
        })
        users.forEach((user)=>{
            delete user.password;
            delete user.salt;
            delete user.tasks;
        })
        return users;
    }

    async getUserById(userId: number): Promise<User>{
        const user = await this.userRepository.findOne({id: userId});
        if(!user) throw new BadRequestException();
        delete user.password;
        delete user.salt;
        delete user.tasks;
        return user;
    }

    async updateUser(updateUserDto: UpdateUserDto, user: User): Promise<User>{
        const {first_name, second_name} = updateUserDto;
        if(!first_name&&!second_name) throw new BadRequestException('Params are empty');
        if(first_name) user.first_name = first_name;
        if(second_name) user.second_name = second_name;
        await user.save();
        delete user.password;
        delete user.salt;
        delete user.tasks;
        return user;
    }

    async deleteUser(user: User):Promise<{statusCode:string}>{
        await this.userRepository.remove(user);
        return {statusCode: '204'}
    }

}
