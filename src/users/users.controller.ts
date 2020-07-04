import { Controller, Get, Param, ParseIntPipe, UseGuards, Query, BadRequestException, Patch, Body, UsePipes, ValidationPipe, Req, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard())
    async getUsers(@Query('page', ParseIntPipe) page: number): Promise<User[]>{
        if(page<0) throw new BadRequestException('Bad guy!')
        return await this.usersService.getUsers(page);
    }
    @Get('/self')
    @UseGuards(AuthGuard())
    async getSelf(@Req() req): Promise<User>{
        const user = req.user;
        delete user.password;
        delete user.salt;
        delete user.tasks;
        return user;
    }
    @Get(':id')
    @UseGuards(AuthGuard())
    async getUserById(@Param('id', ParseIntPipe) userId: number): Promise<User>{
        return await this.usersService.getUserById(userId);
    }
    

    @Patch()
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req): Promise<User>{
        const user: User = req.user;
        return await this.usersService.updateUser(updateUserDto, user);
    }

    @Delete()
    @UseGuards(AuthGuard())
    async deleteUser(@Req() req): Promise<{statusCode:string}>{
        const user: User = req.user;
        return await this.usersService.deleteUser(user);
    }

}
