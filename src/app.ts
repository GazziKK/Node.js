import express, { Express } from "express";
import { Server } from "node:http";
import { ExeptionFilter } from "./errors/exeption.filter";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";

export class App {
  private app: Express;
  private port: number;
  private server: Server
  private loggerService: LoggerService;
	private userController: UserController;
	private exeptionFilter: ExeptionFilter;

  constructor(
		private logger: LoggerService,
		 userController: UserController,
		  exeptionFilter: ExeptionFilter
			) {
    this.app = express();
    this.port = 8000
    this.loggerService = new LoggerService();
		this.userController = userController;
		this.exeptionFilter = exeptionFilter;
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