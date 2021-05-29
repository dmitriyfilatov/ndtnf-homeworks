import { Body, Controller, HttpCode, Param, Post, Req } from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import GetUserDto from './dto/get-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('signup')
  @HttpCode(200)
  async signup(@Body() userData: CreateUserDto): Promise<User> {
    return this.usersService.signup(userData);
  }

  @Post('signin')
  @HttpCode(200)
  async signin(@Body() userData: GetUserDto, @Req() request): Promise<User> {
    return this.usersService.signin(userData, request);
  }
}
