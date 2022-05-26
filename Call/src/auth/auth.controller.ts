import { Controller, Logger, Get, Post, Param, Body, Delete, Query, Put, HttpStatus, } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ClientProxyFactory, ClientsModule, ClientProxy, Transport, ClientOptions, } from '@nestjs/microservices';
import { PartialObserver } from 'rxjs';

@Controller('users')
export class AuthController {
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

    @Get('profile')
    async testAuth() {
        const pattern = { cmd: 'testAuthUsers' };
        return await this.client.send(pattern, {});
    }


    @Post('resgister')
    async register(@Body() CreateAuthDto: CreateAuthDto) {
        const users = await this.client.send<CreateAuthDto>(
            { cmd: 'registerUser' },
            CreateAuthDto,
        );
        return users;
    }
    @Post('login')
    async login(@Body() CreateAuthDto: CreateAuthDto) {
        const users = await this.client.send<CreateAuthDto>(
            { cmd: 'loginUser' },
            CreateAuthDto,
        );
        return users;
    }

}