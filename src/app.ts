import { json } from 'body-parser';
import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { Server } from 'node:http';
import 'reflect-metadata';
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './data-base/prisma.service';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { UserController } from './users/users.controller';

@injectable()
export class App {
	private app: Express;
	private port: number;
	private server: Server;

	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
	}

	public async init(): Promise<void> {
		this.useMidleware();
		this.useRouters();
		this.useExeptinFilters();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.loggerService.log(`Server is runing in http://localhost:${this.port}`);
	}

	public useMidleware(): void {
		this.app.use(json());
	}

	public useRouters(): void {
		this.app.use('/users', this.userController.router);
	}

	public useExeptinFilters(): void {
		this.app.use('/users', this.userController.router);
	}

	public useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}
}
