import { NextFunction, Request, Response } from "express";
import { LoggerService } from "../logger/logger.service";
import { IExeptionFilter } from "./exeption.filter.interface";
import { HTTPError } from "./http-error.class";

export class ExeptionFilter implements IExeptionFilter {
    loggerService: LoggerService;
    constructor(private logerSevice: LoggerService) {
        this.logerSevice = logerSevice
    }
    catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HTTPError) {
            this.logerSevice.error(`[${err.contex}] ${err.message}`);            
            res.status(err.statusCode).send({err: err.message})      
        } else {
            this.logerSevice.error(`${err.message}`)
            res.status(500).send({err: err.message})      
        }
        next();
    }
}