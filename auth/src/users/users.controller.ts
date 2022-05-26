import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Get()
  @MessagePattern({ cmd: 'showAllUsers' })
  async showAllUsers() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.usersService.showAll(),
    };
  }


  @MessagePattern({ cmd: 'createUsers' })
  @Post()
  async createUsers(@Body() data: CreateUserDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'User added successfully',
      data: await this.usersService.create(data),
    };
  }

  @MessagePattern({ cmd: 'readUser' })
  @Get(':id')
  async readUser(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.usersService.read(id),
    };
  }


  @Put(':id')
  @MessagePattern({ cmd: 'uppdateUser' })
  async uppdateUser(@Param('id') id: string, @Body() data:Partial<UpdateUserDto>) {
    return {
      statusCode: HttpStatus.OK,
      message: 'User update successfully',
      data: await this.usersService.update(id, data),
    };
  }

  @Delete(':id')
  @MessagePattern({ cmd: 'deleteUser' })
  async deleteUser(@Body('id') id: string) {
    await this.usersService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully'
    };
  }
}