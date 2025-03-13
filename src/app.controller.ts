/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  Put,
  Req,
  HttpException,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUser } from './get_user.decorator';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  @Post('/signup')
  async Signup(@Res() response, @Body() user: User) {
    const newUSer = await this.userService.signup(user);
    return response.status(HttpStatus.CREATED).json({
      newUSer,
    });
  }
  @Post('/signin')
  async SignIn(@Res() response, @Body() user: User) {
    const token = await this.userService.signin(user, this.jwtService);
    return response.status(HttpStatus.OK).json(token);
  }
  @Put('/service/:id')
  async service(
    @Param('id') id: string,
    @Res() response,
    @Body('serv') serv: object,
  ) {
    const data = await this.userService.updateService(id, serv);
    return response.status(HttpStatus.OK).json(data);
  }
  @Get('/user/:id')
  async getUser(@Param('id') userId: string, @Res() response) {
    const user = await this.userService.getUser(userId);
    return response.status(HttpStatus.OK).json(user);
  }
  @Delete('user/:id')
  async deleteUser(@Param('id') userId: string, @Res() response) {
    const deletedUser = await this.userService.deleteUser(userId);
    return response.status(HttpStatus.OK).json(deletedUser);
  }
  @Put('/user/:id')
  async updateUser(
    @Res() response,
    @Param('id') id: string,
    @Body() CreateUserDto: CreateUserDto,
  ) {
    const user = await this.userService.updateUser(id, CreateUserDto);
    return response.status(HttpStatus.OK).json(user);
  }
  @Get('all_user')
  async getUsers(@Res() response) {
    const users = await this.userService.getUsers();
    return response.status(HttpStatus.OK).json(users);
  }
  @Get('service/:id')
  async get_service(@Param('id') id: string) {
    return await this.userService.getService(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@GetUser() user: User) {
    return user;
  }
  @UseGuards(JwtAuthGuard)
  @Get('test')
  testAuth() {
    return { message: 'You are authenticated!' };
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
