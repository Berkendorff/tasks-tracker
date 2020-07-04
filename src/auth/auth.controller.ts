import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards, Req, Get } from '@nestjs/common';
import { SignUpCredentialsDto } from './dto/signUpCredentials.dto';
import { AuthService } from './auth.service';
import { SignInCredentialsDto } from './dto/signInCredentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorators/getUser.decorator';
import { User } from '../users/user.entity';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}

    @ApiBody({
        description: 'Sign Up',
        type: SignUpCredentialsDto
    })
    @Post('/signup')
    @UsePipes(ValidationPipe)
    async signUp(@Body() signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
        return await this.authService.signUp(signUpCredentialsDto);
    }

    @ApiBody({
        description: 'Sign In',
        type: SignInCredentialsDto
    })
    @Post('/signin')
    @UsePipes(ValidationPipe)
    async signIn(@Body() signInCredentialsDto: SignInCredentialsDto): Promise<{ accessToken :string }>{
        return await this.authService.signIn(signInCredentialsDto);
    }

    @ApiBody({
        description: 'Test get user for debug',
        type: SignInCredentialsDto
    })
    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req){
        const user: User = req.user;
        console.log(user);
    }

}
