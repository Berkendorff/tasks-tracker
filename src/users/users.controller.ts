import { Controller, Get, Param, ParseIntPipe, UseGuards, Query, BadRequestException, Patch, Body, UsePipes, ValidationPipe, Req, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@UseGuards(AuthGuard())
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiBody({
        description:'Get all users with pagination by 10 pages, query param ?page=number>0',
        type:Number
    })
    @Get()
    async getUsers(@Query('page', ParseIntPipe) page: number): Promise<User[]>{
        if(page<0) throw new BadRequestException('Bad guy!')
        return await this.usersService.getUsers(page);
    }

    @ApiBody({
        description: 'Get info about self user'
    })
    @Get('/self')
    async getSelf(@Req() req): Promise<User>{
        const user = req.user;
        delete user.password;
        delete user.salt;
        delete user.tasks;
        return user;
    }
    @ApiBody({
        description: 'Get user by id in param id',
        type: 'number'
    })
    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) userId: number): Promise<User>{
        return await this.usersService.getUserById(userId);
    }
    
    @ApiBody({
        description:'Update user info',
        type: UpdateUserDto
    })
    @Patch()
    @UsePipes(ValidationPipe)
    async updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req): Promise<User>{
        const user: User = req.user;
        return await this.usersService.updateUser(updateUserDto, user);
    }

    @ApiBody({
        description: 'Delete user (self)'
    })
    @Delete()
    async deleteUser(@Req() req): Promise<{statusCode:string}>{
        const user: User = req.user;
        return await this.usersService.deleteUser(user);
    }

}
