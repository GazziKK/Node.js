import express, { Express } from "express";
import { inject, injectable } from "inversify";
import { Server } from "node:http";
import { ExeptionFilter } from "./errors/exeption.filter";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { UserController } from "./users/users.controller";
import 'reflect-metadata'

@injectable()
export class App {
  private app: Express;
  private port: number;
  private server: Server

  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
			) {
    this.app = express();
    this.port = 8000
  }
	
  public async init() {
    this.useRouters();
		this.useExeptinFilters();
    this.server = this.app.listen(this.port);
    this.loggerService.log(`Server is runing in http://localhost:${this.port}`)
  }

  public useRouters() {
    this.app.use('/users', this.userController.router);
  }

	public useExeptinFilters() {
    this.app.use('/users', this.userController.router);
		
  }

	public useExeptionFilters() {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
	}
}