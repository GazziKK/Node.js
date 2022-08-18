import { UserModel } from '@prisma/client';
import { NextFunction, Response, Request } from 'express';
import { User } from './user.entity';

export interface IUserController {
	login: (req: Request, res: Response, next: NextFunction) => void;
	register: (req: Request, res: Response, next: NextFunction) => void;
}

export interface IUsersRepository {
	create: (user: User) => Promise<UserModel>;
	find: (email: string) => Promise<UserModel | null>;
}
