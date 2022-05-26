import { Controller, Logger, Get, Post, Param, Body, Delete, Query, Put, HttpStatus, } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxyFactory, ClientsModule, ClientProxy, Transport, ClientOptions, } from '@nestjs/microservices';
import { PartialObserver } from 'rxjs';
import { UpdateUserDto } from './dto/update-user.dto';
// import {C}

@Controller('users')
export class UsersController {
    client: ClientProxy;
    logger = new Logger('users');
    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.NATS,
            options: {
                servers: ['nats://localhost:4222'],
            },
        });
    }

    @Get()
    async showAllUsers() {
        const pattern = { cmd: 'showAllUsers' };
        return await this.client.send(pattern, {});
    }

    @Get(':id')
    async getBook(@Param('id') id:string) {
        const pattern = { cmd: 'readUser' };
        return await this.client.send<string>(pattern, id);
    }

    @Post()
    async createUsers(@Body() CreateUserDto: CreateUserDto) {
        this.logger.log(CreateUserDto);
        const users = await this.client.send<CreateUserDto>(
            { cmd: 'createUsers' },
            CreateUserDto,
        );
        return users;
    }
    @Put(':id')
    async uppdateUser(@Param('id') id: string, @Body() UpdateUserDto: Partial<UpdateUserDto>) {
        this.logger.log(UpdateUserDto);
        const users = await this.client.send<UpdateUserDto>({ cmd: 'uppdateUser' }, {UpdateUserDto,id});
        return users;
    }
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        const users = await this.client.send({ cmd: 'deleteUser' }, id);
        return users;
    }

}